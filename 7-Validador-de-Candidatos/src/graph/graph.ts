import {StateGraph, START, END} from '@langchain/langgraph'
import { StateAnnotation } from './factory.ts'
import { experienceNode } from './nodes/experienceNode.ts'
import { scoringNode } from './nodes/scoringNode.ts'
import { summaryNode } from './nodes/summaryNode.ts'


const workflow = new StateGraph(StateAnnotation)
    .addNode("extract_exp", experienceNode)
    .addNode("score", scoringNode)
    .addNode("summarize", summaryNode)
    // Definindo o fluxo linear
    .addEdge(START, "extract_exp")
    .addEdge("extract_exp", "score")
    .addEdge("score", "summarize")
    .addEdge("summarize", END)

export const app = workflow.compile()
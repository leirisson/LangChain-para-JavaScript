import { StateGraph, START, END } from '@langchain/langgraph'
import { StateAnnotation } from './factory'
import { classifyNode } from './nodes/classifyNode'
import { metadataNode } from './nodes/metadataNode'



export const workflow = new StateGraph(StateAnnotation)
    .addNode("classifier", classifyNode)
    .addNode("metadata_gen", metadataNode)
    .addEdge(START, "classifier")
    .addEdge("classifier", "metadata_gen")
    .addEdge("metadata_gen", END)
    .compile()
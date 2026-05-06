import {StateGraph, END, START} from '@langchain/langgraph'
import { StateAnnotation } from './factory'
import { calculateShipping } from './nodes/calculateShipping'
import { applyDiscount } from './nodes/applyDiscount'



const workflow = new StateGraph(StateAnnotation)
    .addNode("calculate", calculateShipping)
    .addNode("discount", applyDiscount)
    .addEdge(START, "calculate")
    .addEdge("calculate","discount")
    .addEdge("discount", END)


export const app = workflow.compile()
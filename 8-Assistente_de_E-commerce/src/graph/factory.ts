import { Annotation } from '@langchain/langgraph'

export const StateAnnotation = Annotation.Root({
    cartValue: Annotation<number>(),
    total: Annotation<number>()
})
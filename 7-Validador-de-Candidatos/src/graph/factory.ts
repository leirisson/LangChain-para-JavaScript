import { Annotation } from '@langchain/langgraph'

export const StateAnnotation = Annotation.Root({
    resumeText: Annotation<string>(),
    yearsOfExperience: Annotation<number>(),
    technicalScore: Annotation<number>(),
    finalSummary: Annotation<string>()
})


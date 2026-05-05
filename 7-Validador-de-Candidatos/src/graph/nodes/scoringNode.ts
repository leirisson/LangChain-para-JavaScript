import { StateAnnotation } from "../factory.ts";


export function scoringNode(state: typeof StateAnnotation.State) {
    console.log("--- Gerando Pontuação ---");
    const score = state.yearsOfExperience * 10
    return {
        technicalScore: score
    }
}
import { StateAnnotation } from "../factory.ts";

export async function summaryNode(state: typeof StateAnnotation.State) {
    console.log("--- Formatando Resumo ---");
    const summary = `Candidato com ${state.yearsOfExperience} anos de experiencia. Score: ${state.technicalScore}`
    return {
        finalSummary: summary
    }
}
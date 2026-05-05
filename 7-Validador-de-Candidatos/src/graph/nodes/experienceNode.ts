import { StateAnnotation } from "../factory.ts";



export async function experienceNode(state: typeof StateAnnotation.State) {
    console.log("--- Analisando Experiência ---");
    const yearsMatch = state.resumeText.match(/\d+/)
    const years = yearsMatch ? parseInt(yearsMatch[0]) : 0
    return {
        yearsOfExperience: years
    }
}
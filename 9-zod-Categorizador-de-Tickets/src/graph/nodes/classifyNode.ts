import { StateAnnotation } from '../factory'

export function classifyNode(state: typeof StateAnnotation.State) {
    console.log("--- Classificando Prioridade ---")
    let priority: "baixa" | "media" | "alta" = "baixa"

    const text = state.description.toLocaleLowerCase()

    if (text.includes("urgente") || text.includes("parado")) priority = "alta"
    else if (text.includes("ajuda") || text.includes("duvida")) priority = "media"

    return { priority }
}
import { StateAnnotation } from "../factory";




export function metadataNode(state: typeof StateAnnotation.State) {
    console.log("--- Gerando Metadados ---")
    const isHardware = verificaSeEHardWare(state)
    return {
        metadata: {
            isHardware,
            processedAt: new Date().toISOString()
        }
    }
}

function verificaSeEHardWare(state: typeof StateAnnotation.State): boolean {
    return state.description.toLocaleLowerCase().includes("teclado") ||
        state.description.includes("monitor")
}
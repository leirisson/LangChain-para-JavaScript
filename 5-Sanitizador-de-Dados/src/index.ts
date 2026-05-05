import { Annotation, END, START, StateGraph } from '@langchain/langgraph'


// 1. Definição do Estado
const StateAnnotation = Annotation.Root({
    rawText: Annotation<string>(),
    processedText: Annotation<string>(),
})

// 2. Nós (Nodes)
const removeNoiseNode = async (state: typeof StateAnnotation.State) => {
    console.log("NODE 1°")
    console.log("--- Removendo links e hashtags ---")
    const clean = state.rawText.replace(/(#\w+|https?:\/\/\S+)/g, "").trim()
    console.log("\n")
    return { processedText: clean }

}

const normalizeNode = async (state: typeof StateAnnotation.State) => {
    console.log("NODE 2°")
    console.log("--- Normalizando para minúsculas ---");
    const lower = state.processedText.toLowerCase()
    console.log("\n")
    return {
        processedText: lower
    }
}

// 3. Montagem do Fluxo
const workflow = new StateGraph(StateAnnotation)
.addNode("cleaner", removeNoiseNode)
.addNode("normalizer", normalizeNode)
.addEdge(START,"cleaner")
.addEdge("cleaner", "normalizer")
.addEdge("normalizer", END)


const app = workflow.compile()

// execução
const result = await app.invoke({ rawText: "PROMOÇÃO INCRÍVEL! Confira em https://site.com #OFERTA" })
console.log("Resultado Final:", result.processedText); 
// Saída: "promoção incrível! confira em"
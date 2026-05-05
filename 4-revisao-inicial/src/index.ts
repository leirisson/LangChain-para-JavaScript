import { BaseMessage, HumanMessage } from '@langchain/core/messages'
import { Annotation, END, START, StateGraph } from '@langchain/langgraph'

// Definimos a estrutura do nosso estado
// O estado define quais informações o seu grafo vai manipular. 
// Aqui, usaremos apenas uma lista de mensagens.

const StateAnnotation = Annotation.Root({
    messages: Annotation<BaseMessage[]>({
        reducer: (x, y) => x.concat(y),
        default: () => []
    })
})

// Criando os Nós
// Nós são apenas funções. Vamos criar um nó que simula um "chatbot".
const chatbotNode = async (state: any) => {
    console.log("--- Executando Nó do Chatbot ---")
    // Aqui você chamaria o LLM. Por agora, vamos simular uma resposta:
    const response = {
        role: "assitent",
        content: "Olá! Como posso ajudar ?"
    }

    // Retornamos a atualização do estado
    return { messages: [response] }
}


// Passo D: Montando o Grafo
// Agora conectamos tudo usando o StateGraph.
const workflow = new StateGraph(StateAnnotation)
.addNode("chatbot", chatbotNode) // adciona o nó
.addEdge(START, "chatbot") // Começa no chatbot
.addEdge("chatbot", END) // Termina após o chatbot

// Compilamos o grafo para que ele possa ser executado
const app = workflow.compile()


// Executando o Fluxo
// Para rodar, usamos o método invoke.
const input = {
    messages: [
        new HumanMessage("oi")
    ]
}

const result = await app.invoke(input)

console.log(result.messages)
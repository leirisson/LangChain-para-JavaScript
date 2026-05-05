/**
 * Enriquecedor de Perfil" (User Profiling)
 * Contexto da Demanda: Você está criando um sistema de CRM. Quando um novo lead (cliente em potencial) entra, 
 * o sistema deve primeiro identificar o cargo da pessoa e, em seguida, gerar uma saudação personalizada baseada nesse cargo.
 *  */


import { Annotation, END, START, StateGraph } from '@langchain/langgraph'


const ProfileState = Annotation.Root({
    userInput: Annotation<string>(),
    jobTitle: Annotation<string>(),
    greeting: Annotation<string>(),
})


// Nó 1: Extração (Simulando uma lógica de IA ou Regex)
const ExtractionNode = async (state: any) => {
    const input = state.userInput.toLowerCase()
    let role = "visitante"
    if(input.includes("diretor")) role = "Executivo"
    else if (input.includes("dev")) role = "Desenvolvedor"

    return {jobTitle : role}
}


// Nó 2: Personalização
const greetingNode = async (state: any) => {
    const welcome = `Bem-vindo ${state.jobTitle}! Temos a solução perfeita para você.`
    return { greeting: welcome }
}

// worflow
const profileApp = new StateGraph(ProfileState)
.addNode("extract", ExtractionNode)
.addNode("greet", greetingNode)
.addEdge(START, "extract")
.addEdge("extract", "greet")
.addEdge("greet", END)
.compile()


const result = await profileApp.invoke({
    userInput: "Olá, eu sou Diretor de Arte"
})

console.log(result.greeting);
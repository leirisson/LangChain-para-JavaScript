import { TicketState } from "./graph/factory"
import { workflow } from "./graph/graph"



async function main(){
    try {
        const input:TicketState = {
            description: "deu problema no meu cpu, está tudo parado",
            priority: "alta"
        }

        console.log("Criando um novo chamado")
        const resultChamado = await workflow.invoke(input)

        console.log("resultado do chamdo: ")
        console.log(`Descrição: ${resultChamado.description}`)
        console.log(`Prioridade: ${resultChamado.priority}`)
        console.log(`${resultChamado.metadata?.isHardware ? "Hardware: sim" : "Hardware: não"}`)
    } catch (error) {
        console.log("DEU ALGUM B.O"  + error)
    }
}


main()
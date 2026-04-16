import 'dotenv/config'
import { ChatOpenAI } from '@langchain/openai'
import { HumanMessage } from "@langchain/core/messages"

/**
 * 1 - INSTANCIANDO O MODELO 
 */
const llmClient = new ChatOpenAI({
    model: "gpt-4.1-nano",
    temperature: 0.3,
})

/**
 * 2 - Criando uma função para testar a chamada da API
*/

async function testarConexaoComAOpenAI() {
    console.log("Chamando o modelo...⏳⏳")
    try {
        const response = await llmClient.invoke([
            new HumanMessage("olá! Diga apenas 'Conexão estabelecida com sucesso' se estiver me ouvindo.")
        ])
        console.log("Respostra do modelo: 🤖 ", response.content)
    } catch (error) {
        error instanceof (Error) ? console.error("Erro ao conectar: ", error.message) : console.log(String(error))
        
    }
}



testarConexaoComAOpenAI()
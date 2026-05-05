import "dotenv/config"
import { ChatOpenAI } from '@langchain/openai'
import { tool } from '@langchain/core/tools'
import { z } from 'zod'
import { HumanMessage } from "@langchain/core/messages"


// criando a ferramenta de soma
const somar = tool(
    ({a, b}) => {
        return (a + b).toString()
    },
    {
        name: "calculadora_soma",
        description: "Soma dois números pasados pelo usuário",
        schema: z.object({
            a: z.number().describe("O primeiro número"),
            b: z.number().describe("O segundo número")
        })
    }
)


const tools = [somar]

const clientLLM = new  ChatOpenAI({
    apiKey:process.env.OPENAI_API_KEY,
    model: "gpt-4.1-nano",
    temperature: 0,
}).bindTools(tools) // O bindTools conecta as ferramentas ao modelo

async function iniciarConversa(){
   const pergunta = new HumanMessage("Quanto é 153 + 217?")

   console.log("Usário: ", pergunta.content)

   // O modelo analisa a pergunta e decide chamar a ferramenta
   const respostaDoModelo = await clientLLM.invoke([pergunta])

   // Se o modelo quiser usar uma ferramenta, ele retorna um 'tool_calls'
   if(respostaDoModelo.tool_calls && respostaDoModelo.tool_calls.length > 0){
    const chamada = respostaDoModelo.tool_calls[0]
    console.log(`----- Agente decidiu usar a ferramenta: ${chamada.name} -----`)

    // Executamos a ferramenta manualmente para este exemplo simples
    // const args = chamada.args as {a: number, b: number}
    const resultado = await somar.invoke(chamada.args as {a: number, b: number});
    console.log("Resultado da conta:", resultado);
   }else {
    console.log("Resposta Direta:", respostaDoModelo.content);
  }
}

iniciarConversa();
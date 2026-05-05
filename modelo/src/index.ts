import { tool } from '@langchain/core/tools'
import { z } from 'zod'

const getUserLocation = tool(
    async () => {
        // em cénario real, essa fnção acessaria uma API ou um Banco de dados
        return "Manaus Amazonas - Brasil"
    },
    {
        name: "get_user_location",
        description: "Obtém a localização atual do usúario",
        schema: z.object({}), // Sem argumentos necessários neste exemplo
    }

)
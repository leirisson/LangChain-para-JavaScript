import { Annotation } from '@langchain/langgraph'
import { z } from 'zod/v3'

// Schema de validação para o Estado
export const TickectSchema = z.object({
    description: z.string()
        .min(10, "A descrição deve ter pelo menos 10 caracteres"),
    priority: z.enum(["baixa", "media", "alta"]).default("baixa"),
    metadata: z.object({
        isHardware: z.boolean(),
        processdaAt: z.string().optional()
    }).optional()
})

// Inferimos o tipo do TypeScript a partir do Schema do Zod
export type TicketState = z.infer<typeof TickectSchema>

export const StateAnnotation = Annotation.Root({
    description: Annotation<string>(),
    priority: Annotation<"baixa" | "media" | "alta">(),
    metadata: Annotation<TicketState["metadata"]>()
})
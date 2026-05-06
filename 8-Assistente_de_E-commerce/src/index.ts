import { app } from "./graph/graph.ts"


async function main() {
    try {
        const input = {
            cartValue: 2500
        }
        console.log("iniciando fluxo")
        const result = await app.invoke(input)
        console.log("\n--- RESULTADO FINAL ---");
        console.log(result.total);
    } catch (error) {
        console.log(`DEU MONTE DE ERRO AQUI: ${error}`)
    }
}


main()
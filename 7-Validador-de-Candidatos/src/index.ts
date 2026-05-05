import { app } from "./graph/graph.ts"


async function main() {
  const input = { 
    resumeText: "Tenho 5 anos trabalhando com Java e Spring Boot." 
  };

  console.log("Iniciando fluxo de RH...");
  const result = await app.invoke(input);
  
  console.log("\n--- RESULTADO FINAL ---");
  console.log(result.finalSummary);
}

main().catch(console.error);
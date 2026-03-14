export default async function handler(req, res) {

try {

// permitir teste direto no navegador
if (req.method !== "POST") {
return res.status(200).json({
resultado: "API funcionando 🚀"
});
}

// garantir body
const { tipo, meta, custo } = req.body || {};

if (!tipo || !meta || !custo) {
return res.status(400).json({
resultado: "Dados incompletos enviados."
});
}

const prompt = `
Você é um especialista em negócios de comida de rua.

Crie um cardápio lucrativo para vender ${tipo}.

Meta diária: R$${meta}
Custo por unidade: R$${custo}

REGRAS:

1. Crie exatamente 5 pratos.
2. Use nomes criativos e vendáveis.
3. Descrição curta (máximo 1 linha).
4. Sugira preço com margem saudável.

FORMATO OBRIGATÓRIO EM MARKDOWN:

## Cardápio Lucrativo

### Nome do prato
Descrição curta  
Preço sugerido: R$

(repita para os 5 pratos)

Depois crie esta tabela:

| Prato | Preço | Unidades necessárias |

Calcule quantas unidades precisam ser vendidas para atingir aproximadamente R$${meta}.
`;

const response = await fetch("https://api.openai.com/v1/chat/completions", {

method: "POST",

headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
},

body: JSON.stringify({
model: "gpt-4o-mini",
temperature: 0.6,
messages: [
{
role: "user",
content: prompt
}
]
})

});

const data = await response.json();

if (!response.ok) {

console.error("Erro OpenAI:", data);

return res.status(500).json({
resultado: "Erro da OpenAI ao gerar cardápio."
});

}

const texto = data?.choices?.[0]?.message?.content;

res.status(200).json({
resultado: texto || "Erro ao gerar cardápio."
});

}

catch (error) {

console.error("Erro interno:", error);

res.status(500).json({
resultado: "Erro interno da API."
});

}

}

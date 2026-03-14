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
Você ajuda pessoas simples a ganhar dinheiro vendendo comida.

Crie um cardápio lucrativo para vender ${tipo}.

Meta diária: R$${meta}
Custo por unidade: R$${custo}

REGRAS IMPORTANTES:

- Use linguagem simples
- Nada de textos longos
- Resposta fácil de entender
- Exatamente 5 pratos

FORMATO DA RESPOSTA:

## 🍲 Cardápio Lucrativo

Nome do prato  
💰 Preço sugerido: R$

(repita para os 5 pratos)

Depois mostre:

## 📊 Quantidade para bater a meta

| Prato | Preço | Quantidade |

Calcule quantas unidades precisam ser vendidas para chegar perto de R$${meta}.

Depois finalize com:

## 🎯 Resumo rápido

Explique em 2 ou 3 linhas qual prato é mais fácil vender para atingir a meta.
`;

const response = await fetch("https://api.openai.com/v1/chat/completions", {

method: "POST",

headers: {
"Content-Type": "application/json",
"Authorization": \`Bearer \${process.env.OPENAI_API_KEY}\`
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

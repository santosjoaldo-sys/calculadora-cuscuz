export default async function handler(req, res) {

try {

if (req.method !== "POST") {
return res.status(200).json({
resultado: "API funcionando 🚀"
});
}

// garantir body
const body = req.body || {};

const tipo = body.tipo || "";
const meta = body.meta || "";
const custo = body.custo || "";

if (!tipo || !meta || !custo) {
return res.status(400).json({
resultado: "Dados incompletos enviados."
});
}

const prompt = `
Crie um cardápio lucrativo para vender ${tipo}.

Meta diária: R$${meta}
Custo por unidade: R$${custo}

Formate em Markdown com:

## Cardápio Lucrativo

Para cada prato:
Nome
Descrição
Preço sugerido

Depois crie uma tabela:

| Prato | Preço | Unidades |
`;

const response = await fetch("https://api.openai.com/v1/chat/completions", {

method: "POST",

headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
},

body: JSON.stringify({
model: "gpt-4o-mini",
messages: [
{ role: "user", content: prompt }
]
})

});

const data = await response.json();

if (!response.ok) {
return res.status(500).json({
resultado: "Erro OpenAI: " + JSON.stringify(data)
});
}

const texto = data?.choices?.[0]?.message?.content;

res.status(200).json({
resultado: texto || "Erro ao gerar cardápio."
});

}

catch (error) {

console.error(error);

res.status(500).json({
resultado: "Erro interno da API."
});

}

}

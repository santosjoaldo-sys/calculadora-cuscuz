export default async function handler(req, res) {

try {

if (req.method !== "POST") {
return res.status(200).json({
resultado: "API funcionando 🚀"
});
}

// garante que o body exista
const { tipo, meta, custo } = req.body || {};

if (!tipo || !meta || !custo) {
return res.status(400).json({
resultado: "Dados incompletos enviados."
});
}

const prompt = `
Crie um cardápio lucrativo para vender ${tipo}.

Meta diária: R$${meta}
Custo por unidade: R$${custo}

Gere:
- 5 pratos gourmet criativos
- preço sugerido
- quantas unidades vender para atingir a meta
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

// se a OpenAI retornar erro
if (!response.ok) {
return res.status(500).json({
resultado: "Erro da OpenAI: " + JSON.stringify(data)
});
}

const resultado =
data?.choices?.[0]?.message?.content ||
"Erro ao gerar cardápio com IA.";

res.status(200).json({
resultado: resultado
});

}

catch (error) {

console.error(error);

res.status(500).json({
resultado: "Erro interno: " + error.message
});

}

}

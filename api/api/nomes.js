
export default async function handler(req, res) {

try {

if (req.method !== "POST") {
return res.status(200).json({
resultado: "API nomes funcionando 🚀"
});
}

const { produto } = req.body || {};

if (!produto) {
return res.status(400).json({
resultado: "Produto não informado."
});
}

const prompt = `
Crie 10 nomes criativos e irresistíveis para vender ${produto}.

Os nomes devem parecer gourmet e chamativos.

Exemplo de estilo:
Cuscuz Vulcão Nordestino
Cuscuz Ouro do Sertão

Liste apenas os nomes.
`;

const response = await fetch("https://api.openai.com/v1/chat/completions",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${process.env.OPENAI_API_KEY}`
},

body: JSON.stringify({
model:"gpt-4o-mini",
temperature:0.7,
messages:[
{role:"user",content:prompt}
]
})

});

const data = await response.json();

const texto = data?.choices?.[0]?.message?.content;

res.status(200).json({
resultado: texto || "Erro ao gerar nomes."
});

}

catch(error){

res.status(500).json({
resultado:"Erro interno."
});

}

}

export default async function handler(req, res) {

try {

if (req.method !== "POST") {
return res.status(200).json({
resultado: "API funcionando 🚀"
});
}

const { tipo, meta, custo } = req.body;

const prompt = `
Crie um cardápio lucrativo para vender ${tipo}.

Meta diária: R$${meta}
Custo por unidade: R$${custo}

Gere:

- 5 pratos gourmet com nomes criativos
- preço sugerido
- quantas unidades vender para atingir a meta
`;

const response = await fetch("https://api.openai.com/v1/chat/completions",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${process.env.OPENAI_API_KEY}`
},

body: JSON.stringify({
model:"gpt-4o-mini",
messages:[
{role:"user",content:prompt}
]
})

});

const data = await response.json();

res.status(200).json({
resultado:data.choices?.[0]?.message?.content || "Erro ao gerar cardápio"
});

}

catch(error){

res.status(500).json({
erro:error.message
});

}

}

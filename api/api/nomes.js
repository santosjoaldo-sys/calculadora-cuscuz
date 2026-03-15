export default async function handler(req, res) {

try {

if (req.method !== "POST") {
return res.status(200).json({resultado:"API nomes funcionando"});
}

const { produto } = req.body || {};

const prompt = `
Crie 10 nomes criativos e irresistíveis para vender ${produto}.
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
messages:[
{role:"user",content:prompt}
]
})

});

const data = await response.json();

res.status(200).json({
resultado:data?.choices?.[0]?.message?.content
});

}

catch(error){

res.status(500).json({
resultado:"Erro ao gerar nomes."
});

}

}

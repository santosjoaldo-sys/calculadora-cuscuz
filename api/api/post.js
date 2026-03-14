
export default async function handler(req, res) {

try {

const { produto } = req.body || {};

const prompt = `
Crie um post curto para Instagram vendendo ${produto}.

Inclua:
- frase chamativa
- emojis
- call to action
- hashtags
`;

const response = await fetch("https://api.openai.com/v1/chat/completions",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${process.env.OPENAI_API_KEY}`
},

body: JSON.stringify({
model:"gpt-4o-mini",
temperature:0.8,
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
resultado:"Erro ao gerar post."
});

}

}

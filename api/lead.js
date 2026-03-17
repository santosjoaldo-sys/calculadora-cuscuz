export default async function handler(req, res) {

if (req.method !== "POST") {
return res.status(200).json({status:"API ativa"});
}

try{

const { nome, whatsapp, cidade, estado } = req.body;

const response = await fetch("https://script.google.com/macros/s/AKfycbxQMYUc1pufysJu3etDHjmvdziyMSo_EgyhSTxtOfROEDHTlm9rLgh3UwoVetk5HpR6ZA/exec",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
nome,
whatsapp,
cidade,
estado
})

});

return res.status(200).json({
status:"lead_salvo"
});

}catch(error){

return res.status(500).json({
status:"erro"
});

}

}

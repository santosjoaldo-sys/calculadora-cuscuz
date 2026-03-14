<!DOCTYPE html>
<html lang="pt-br">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Gerador de Cardápio Lucrativo</title>

<style>

body{
font-family: Arial;
background:#fff5e6;
display:flex;
justify-content:center;
align-items:center;
height:100vh;
margin:0;
}

.container{
background:white;
padding:30px;
width:450px;
border-radius:12px;
box-shadow:0 10px 25px rgba(0,0,0,0.1);
text-align:center;
}

h1{
color:#ff7a00;
}

input, select{
width:100%;
padding:12px;
margin-top:10px;
border:1px solid #ddd;
border-radius:6px;
}

button{
width:100%;
padding:12px;
margin-top:15px;
background:#6a5acd;
color:white;
border:none;
cursor:pointer;
font-size:16px;
}

button:hover{
opacity:0.9;
}

.result{
margin-top:25px;
text-align:left;
font-size:15px;
line-height:1.5;
}

.result h2{
color:#ff7a00;
margin-top:15px;
}

.result strong{
color:#333;
}

.result table{
border-collapse:collapse;
width:100%;
margin-top:20px;
}

.result table th{
background:#ff7a00;
color:white;
padding:8px;
}

.result table td{
border:1px solid #ddd;
padding:8px;
}

.loading{
color:#666;
font-style:italic;
}

</style>

</head>

<body>

<div class="container">

<h1>Gerador de Cardápio Lucrativo</h1>

<select id="tipo">

<option value="cuscuz gourmet">Cuscuz Gourmet</option>
<option value="bolo no pote">Bolo no Pote</option>
<option value="pastel">Pastel</option>

</select>

<input type="number" id="meta" placeholder="Quanto quer ganhar por dia">

<input type="number" id="custo" placeholder="Custo por unidade">

<button onclick="gerarCardapio()">Gerar Cardápio</button>

<div class="result" id="resultado"></div>

</div>


<!-- biblioteca para converter Markdown em HTML -->
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>


<script>

async function gerarCardapio(){

let tipo = document.getElementById("tipo").value;
let meta = document.getElementById("meta").value;
let custo = document.getElementById("custo").value;

if(!meta || !custo){

alert("Preencha todos os campos");

return;

}

document.getElementById("resultado").innerHTML =
"<span class='loading'>Gerando cardápio com IA...</span>";

try{

const response = await fetch("/api/cardapio",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
tipo: tipo,
meta: meta,
custo: custo
})

});

const data = await response.json();

document.getElementById("resultado").innerHTML =
marked.parse(data.resultado);

}

catch(error){

document.getElementById("resultado").innerHTML =
"Erro ao gerar cardápio.";

}

}

</script>

</body>

</html>

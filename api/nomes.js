export default async function handler(req, res) {

  try {

    // permitir teste no navegador
    if (req.method !== "POST") {
      return res.status(200).json({
        resultado: "API de nomes funcionando 🚀"
      });
    }

    let { tipo } = req.body || {};

    if (!tipo) {
      return res.status(400).json({
        resultado: "Tipo de comida não informado."
      });
    }

    tipo = String(tipo).trim();

    const prompt = `
Você ajuda vendedores de comida a criar nomes que chamam atenção.

Crie 10 nomes criativos e vendáveis para ${tipo}.

REGRAS:
- Linguagem simples
- Nomes curtos
- Ideais para cardápios
- Um nome por linha
- Sem explicações

Exemplo de estilo:

🔥 ${tipo} do Chef  
🌟 ${tipo} Especial  
💰 ${tipo} Lucrativo  
🍲 ${tipo} da Casa
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },

      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.8,
        max_tokens: 200,
        messages: [
          { role: "user", content: prompt }
        ]
      })

    });

    const data = await response.json();

    if (!response.ok) {

      console.error("Erro OpenAI:", data);

      return res.status(500).json({
        resultado: "Erro da OpenAI ao gerar nomes."
      });

    }

    const texto = data?.choices?.[0]?.message?.content;

    res.status(200).json({
      resultado: texto || "Erro ao gerar nomes."
    });

  } catch (error) {

    console.error("Erro interno:", error);

    res.status(500).json({
      resultado: "Erro interno da API."
    });

  }

}

export default async function handler(req, res) {

  try {

    // permitir teste direto no navegador
    if (req.method !== "POST") {
      return res.status(200).json({
        resultado: "API de posts funcionando 🚀"
      });
    }

    let { tipo, promo } = req.body || {};

    if (!tipo) {
      return res.status(400).json({
        resultado: "Tipo de comida não informado."
      });
    }

    tipo = String(tipo).trim();
    promo = promo ? String(promo).trim() : "";

    const prompt = `
Você ajuda vendedores de comida a criar posts que vendem no Instagram e WhatsApp.

Crie um post de venda para ${tipo}.

Promoção ou destaque: ${promo}

REGRAS:
- Linguagem simples
- Texto curto
- Foco em venda
- Incluir chamada para pedido no WhatsApp
- Incluir emojis

FORMATO:

🔥 Título chamativo

Descrição curta da comida

💰 Destaque de venda

📲 Peça agora pelo WhatsApp

#hashtag #comida #delivery
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },

      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.7,
        max_tokens: 250,
        messages: [
          { role: "user", content: prompt }
        ]
      })

    });

    const data = await response.json();

    if (!response.ok) {

      console.error("Erro OpenAI:", data);

      return res.status(500).json({
        resultado: "Erro da OpenAI ao gerar post."
      });

    }

    const texto = data?.choices?.[0]?.message?.content;

    res.status(200).json({
      resultado: texto || "Erro ao gerar post."
    });

  } catch (error) {

    console.error("Erro interno:", error);

    res.status(500).json({
      resultado: "Erro interno da API."
    });

  }

}

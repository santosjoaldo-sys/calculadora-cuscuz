export default async function handler(req, res) {

  try {

    // permitir teste direto no navegador
    if (req.method !== "POST") {
      return res.status(200).json({
        resultado: "API de combos funcionando 🚀"
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
Você ajuda pessoas simples a vender mais comida criando combos lucrativos.

Crie 5 combos lucrativos para vender ${tipo}.

REGRAS:
- Linguagem simples
- Combos fáceis de montar
- Cada combo deve ter nome
- Incluir preço sugerido
- Sem textos longos

FORMATO:

## 📦 Combos Lucrativos

Nome do combo  
Itens do combo  
💰 Preço sugerido: R$

(repita para 5 combos)
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
        max_tokens: 300,
        messages: [
          { role: "user", content: prompt }
        ]
      })

    });

    const data = await response.json();

    if (!response.ok) {

      console.error("Erro OpenAI:", data);

      return res.status(500).json({
        resultado: "Erro da OpenAI ao gerar combos."
      });

    }

    const texto = data?.choices?.[0]?.message?.content;

    res.status(200).json({
      resultado: texto || "Erro ao gerar combos."
    });

  } catch (error) {

    console.error("Erro interno:", error);

    res.status(500).json({
      resultado: "Erro interno da API."
    });

  }

}

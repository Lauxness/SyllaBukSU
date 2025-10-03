const axios = require("axios");
const base_url = process.env.GENERATOR_BASE_URL;
const ChatBot = async (req, res) => {
  const { userPrompt, currentResult } = req.body;
  const prompt = `data: ${currentResult},
  prompt: ${userPrompt},
  Rules: [direct answer, 1 paragraph only, dont put bold text,no extra message, keep the meaning intact, if the prompt dont is not related to any customization of the data just response the data back without any changes, dont add anything that dont connect to the data, be specific with the prompt, dont change the format of the data, just do what is ask, do not include the labels in the result  ]`;
  try {
    const response = await axios.post(`${base_url}/chat/request/chatbot`, {
      prompt: prompt,
    });
    return res.status(200).json({ data: response.data });
  } catch (error) {
    console.error("Error fetching chatbot response:", error.message);

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { ChatBot };

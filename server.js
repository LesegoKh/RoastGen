const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors()); 
const url = "https://api.forefront.ai/v1/chat/completions";
const api_key = process.env.FOREFRONT_API_KEY;

app.post("/generate", async (req, res) => {
    try {
        const userMessage = req.body.message;
        if (!userMessage) throw new Error("No message provided!");

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${api_key}`
            },
            body: JSON.stringify({
                model: "forefront/OpenHermes-2.5-Mistral-7B",
                messages: [{ role: "user", content: userMessage }],
                max_tokens: 164,
                temperature: 0.8,
            }),
        };

        const response = await fetch(url, options);
        const data = await response.json();

        if (data.choices && data.choices[0] && data.choices[0].message) {
            res.json({ response: data.choices[0].message.content });
        } else {
            throw new Error("Invalid API response format");
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(3000, () => console.log("🚀 Server running on port 3000"));

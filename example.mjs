

const url = "https://api.forefront.ai/v1/chat/completions"; 
const api_key = process.env.FOREFRONT_API_KEY;  

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api_key}`,  
    },
    body: JSON.stringify({
        model: "forefront/OpenHermes-2.5-Mistral-7B", 
        messages: [
            {
                role: "user",
                content: "write a haiku about AI", 
            }
        ],
        max_tokens: 128,
        temperature: 0.7,  
    })
};


async function fetchCompletion() {
    try {
        const response = await fetch(url, options);  
        const data = await response.json(); 
        console.log(data.choices[0].message.content); 
    } catch (error) {
        console.error("Error fetching data:", error);  
    }
}


fetchCompletion();

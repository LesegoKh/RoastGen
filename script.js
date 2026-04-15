document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("generateRoast").addEventListener("click", async function () {
        const selectedMode = document.getElementById("roastMode").value;
        const topic = document.getElementById("roastTopic").value.trim() || "your existence";
        const roastOutput = document.getElementById("roastOutput");

        roastOutput.textContent = "🔥 Generating the perfect roast... 🔥";

        try {
            const response = await fetch("http://localhost:3000/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: `Roast me in ${selectedMode} mode about ${topic}. Be savage, funny, and sharp! No explanations—just the roast!`
                })
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            console.log("API Response:", data); // Debugging: Check if API is returning expected format

            // Ensure response contains roast text
            roastOutput.textContent = data.response || "🔥 Roast failed! The AI went soft. Try again! 🔥";

        } catch (error) {
            console.error("Error:", error);
            roastOutput.textContent = "❌ Error! Couldn't fetch the roast. Try again later.";
        }
    });
});

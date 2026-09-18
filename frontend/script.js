const questionInput = document.getElementById("question");
const askButton = document.getElementById("askButton");
const chat = document.getElementById("chat");

askButton.addEventListener("click", async function () {

    const question = questionInput.value;

    if (question === "") {
        return;
    }

    const userMessage = document.createElement("p");
    userMessage.textContent = "You: " + question;
    chat.appendChild(userMessage);

    questionInput.value = "";


    const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            question: question
        })
    });

    const result = await response.json();
    
    const aiMessage = document.createElement("p");

    aiMessage.textContent = "AI: " + result.answer;
    chat.appendChild(aiMessage);
});
const questionInput = document.getElementById("question");
const askButton = document.getElementById("askButton");
const chat = document.getElementById("chat");

function formatAIResponse(text) {

    let html = text;

    // Escape HTML characters
    html = html
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // Remove Markdown escaping
    html = html.replace(/\\([`.*_{}[\]()#+\-.!])/g, "$1");

    // Code blocks
    html = html.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    '<pre><code>$2</code></pre>'
    );

    // Inline code
    html = html.replace(
        /`([^`]+)`/g,
        "<code>$1</code>"
    );

    // Headings
    html = html.replace(
        /^### (.*)$/gm,
        "<strong>$1</strong>"
    );

    html = html.replace(
        /^## (.*)$/gm,
        "<strong>$1</strong>"
    );

    // Bold
    html = html.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
    );

    // Bullet points
    html = html.replace(
        /^[-*] (.*)$/gm,
        "• $1"
    );

    // Line breaks
    html = html.replace(/\n/g, "<br>");

    return html;
}


askButton.addEventListener("click", async function () {

    const question = questionInput.value.trim();

    if (question === "") {
        return;
    }

    const userMessage = document.createElement("p");
    userMessage.textContent = "You: " + question;
    chat.appendChild(userMessage);

    questionInput.value = "";

    let loadingMessage;

    try {

        loadingMessage = document.createElement("p");

        loadingMessage.id = "loading";

        loadingMessage.innerHTML = `
            AI:
            <span class="dot">.</span>
            <span class="dot">.</span>
            <span class="dot">.</span>
        `;

        chat.appendChild(loadingMessage);

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

        loadingMessage.remove();

        const aiMessage = document.createElement("p");
        aiMessage.innerHTML = "AI: " + formatAIResponse(result.answer);

        chat.appendChild(aiMessage);

    } catch (error) {

        if (loadingMessage) {
            loadingMessage.remove();
        }

        const errorMessage = document.createElement("p");
        errorMessage.textContent =
            "AI: Something went wrong. Please try again.";

        chat.appendChild(errorMessage);

        console.error(error);
    }
});
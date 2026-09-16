const questionInput= document.querySelector("#question");
const askButton= document.querySelector("#askButton");
const chat= document.querySelector("#chat");

askButton.addEventListener("click", () => {

    const question = questionInput.value;
    
    if (question === "") {
        return;
    }

    const userMessage = document.createElement("p");

    userMessage.textContent = "You: " + question;
    chat.appendChild(userMessage);
    questionInput.value = "";
});
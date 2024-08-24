const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chabotToggler = document.querySelector(".chatbot-toggler");
const chabotCloseBtn = document.querySelector(".close-btn");


let userMessage;
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Create chat <li> element with the passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    
    // Properly interpolate the message variable
    let chatContent = className === "outgoing" 
        ? `<p>${message}</p>` 
        : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    
    chatLi.innerHTML = chatContent;
    return chatLi;
}

let userChatId = ''
const generateResponse = (userMessage) => {
    const API_URL = "https://flowise.ev2.dev/api/v1/prediction/276d1318-4130-487a-a533-539342ed1b6f";
    const body = {
        question: userMessage,
    }

    // Add userChatId to the body if it exists
    if (userChatId) {
        body.chatId = userChatId;
    }

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify(body),
    }
    console.log(requestOptions);
    //Send POST request to API, get response 
    fetch(API_URL, requestOptions)
    .then(res => res.json())
    .then(data => {
        // Remove the "Thinking..." message
        const thinkingMessage = document.querySelector(".incoming");
        if (thinkingMessage) thinkingMessage.remove();
        // Append bot's response to chatbox
        const botResponse = data.text || "Sorry, something went wrong.";  // Adjust based on API response structure
        chatbox.appendChild(createChatLi(botResponse, "incoming"));
        console.log(data);
        // Update userChatId if it exists in the response
        userChatId = data.chatId || ''
    })
    .catch((error) => {
        console.error("Error:", error);

        // Remove the "Thinking..." message and display an error
        const thinkingMessage = document.querySelector(".incoming");
        if (thinkingMessage) thinkingMessage.remove();

        chatbox.appendChild(createChatLi("Failed to get a response.", "incoming"));
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;

    // Clear the input field
    chatInput.value = "";

    // Append user's message to chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
         chatbox.appendChild(createChatLi("Thinking...", "incoming"));
         chatbox.scrollTo(0, chatbox.scrollHeight);
         generateResponse(userMessage);
    }, 600);
}


sendChatBtn.addEventListener("click", handleChat);
chabotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
chabotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter") handleChat();
});

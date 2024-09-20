import { db } from './initialize_firestore.js';
import { collection, doc, getDoc, setDoc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// profile

//dashboard

//cashflow

//credit assessment

// llm
// Read from Firestore
const llmRef = doc(db, "users", "investees", "investee0", "llm");

var llmMessages = null;

getDoc(llmRef)
.then((llmSnap) => {
    if (llmSnap.exists()) {
        console.log("Document data:", llmSnap.data());
        llmMessages = llmSnap.data()['messages'];    
    } else {
        console.log("Undefined! Couldn't fetch document's snapshot.");
    }
})
.catch((error) => {
        console.error("Error in getting the document:", error);
});

// // Dummy message database
// const dummyDatabase = [
//     { text: "Hello! I'm Phi, an AI digital assistant here to help you. What can I do for you today?", sent: true, name: "Phi-3" },
// ];

// Load existing messages
function loadMessagesFromDatabase() {
    if (llmMessages == null) {
        llmMessages = [{text: "An error occured when fetching messages from database. Please try reloading the site or contacting the support.", sent: true, name: "AI"}]
    }

    const messageDisplay = document.getElementById("message-display");
    llmMessages.forEach((message) => {
        const messageElement = createMessageElement(message.text, message.sent, message.name);
        messageDisplay.appendChild(messageElement);
    });

    // messageDisplay.scrollTop = messageDisplay.scrollHeight;

    // Scroll to the bottom after loading messages
    scrollToBottom();

    llmMessages = null;
}


// Load messages on page load
// window.onload = async function () {
//     await loadMessagesFromDatabase();
// };
setTimeout(() => {
    loadMessagesFromDatabase();
    }, 5000);

// Function to send message
async function sendMessage() {
    const messageInput = document.getElementById("message-input");
    const messageText = messageInput.value.trim();

    if (messageText) {
        // Clear input
        messageInput.value = "";

        // Add user message
        const messageDisplay = document.getElementById("message-display");
        const userMessageElement = createMessageElement(messageText, true, "You");
        messageDisplay.appendChild(userMessageElement);

        // Write to Firestore
        updateDoc(llmRef, {
            messages: arrayUnion({ text: messageText, sent: true, name: "You" })
        })
        .then(() => {
        console.log("Array updated successfully!");
        })
        .catch((error) => {
        console.error("Error updating array:", error);
        });

        // Typing animation
        const typingIndicator = document.createElement("div");
        typingIndicator.classList.add("message");
        const typingAnimation = document.createElement("span");
        typingAnimation.classList.add("typing-animation");
        typingIndicator.appendChild(typingAnimation);
        messageDisplay.appendChild(typingIndicator);

        // messageDisplay.scrollTop = messageDisplay.scrollHeight;

        // Scroll to the bottom
        scrollToBottom();
    
        // Get assistant response
        const responseText = await getLLMResponse(messageText);
        messageDisplay.removeChild(typingIndicator);
        const llmMessageElement = createMessageElement(responseText, true, "Phi-3");
        messageDisplay.appendChild(llmMessageElement);
        // llmMessages.push({ text: responseText, sent: true , name: "Phi-3"});

        // Write to Firestore
        updateDoc(llmRef, {
            messages: arrayUnion({ text: responseText, sent: true, name: "Phi-3" })
        })
        .then(() => {
        console.log("Array updated successfully!");
        })
        .catch((error) => {
        console.error("Error updating array:", error);
        });
        // Put a response after 5 second
        // setTimeout(() => {
        //     messageDisplay.removeChild(typingIndicator);
        //     const llmMessageElement = createMessageElement(responseText, true, "Phi-3");
        //     messageDisplay.appendChild(llmMessageElement);

        //     // messageDisplay.scrollTop = messageDisplay.scrollHeight;

        //     // Scroll to the bottom after adding the message
        //     scrollToBottom();

        //     dummyDatabase.push({ text: responseText, sent: true , name: "Phi-3"});
        // }, 5000);
    }
}

document.getElementById("send-button").addEventListener("onclick", function (e) {
    sendMessage();
});

// Send message on pressing "Enter" key
document.getElementById("message-input").addEventListener("keypress", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Define the API endpoint and the message to send
const apiUrl = 'https://cc56-35-247-151-154.ngrok-free.app/generate'; // Replace with your actual API URL

// Get response from assistant (LLM)
async function getLLMResponse(messageText) {
    const messageDisplay = document.getElementById("message-display");
    const llmResponse = null;

    // messageDisplay.scrollTop = messageDisplay.scrollHeight;

    // Scroll to the bottom
    scrollToBottom();

    // console.log(messageText)
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: messageText }),
        });

        // Check if the request was successful
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        // Parse and handle the JSON response
        const data = await response.json();
        console.log('Response from API:', data);
        return data

    } catch (error) {
        console.error('Error:', error);
    }
}

// Create a message element with avatars and without boxes
function createMessageElement(text, sent, name) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    if (sent) {
        messageDiv.classList.add("sent");
    }
    // Create the header (image + name side by side)
    const messageHeader = document.createElement("div");
    messageHeader.classList.add("message-header");
    const avatarImg = document.createElement("img");
    avatarImg.src = sent ? "../static/assets/boy.png" : "../static/assets/sparkle.png";
    avatarImg.alt = "Avatar";

    const nameLabel = document.createElement("span");
    nameLabel.classList.add("name");
    nameLabel.textContent = name;

    messageHeader.appendChild(avatarImg);
    messageHeader.appendChild(nameLabel);

    // Create the message text element
    const messageText = document.createElement("p");
    messageText.textContent = text;

    // Add header and message text to the message div
    messageDiv.appendChild(messageHeader);
    messageDiv.appendChild(messageText);

    return messageDiv;
}

// Scroll to the bottom of the message display area
function scrollToBottom() {
    const messageDisplay = document.getElementById("message-display");
    messageDisplay.scrollTop = messageDisplay.scrollHeight;
}
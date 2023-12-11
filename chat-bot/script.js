const chatInput = document.querySelector(".input-feild .chat-input");
const messagesContainer = document.querySelector(".messages");
const sendChatButton = document.querySelector(".input-feild .send-btn");

let userMessage;

function createChatLi(message, class_name) {
  let liElement = document.createElement("li");
  liElement.classList.add("message", class_name);

  let spanElement = document.createElement("span");
  spanElement.innerText = message;

  let botIcon = document.createElement("i");
  botIcon.classList.add("fa-solid", "fa-robot");

  if (message === "• • • • •") {
    spanElement.classList.add("prosessing-text");
  }

  if (class_name === "outgoing") {
    liElement.appendChild(spanElement);
  } else {
    liElement.appendChild(spanElement);
    liElement.insertBefore(botIcon, spanElement);
  }

  return liElement;
}

function handleChat() {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;
  messagesContainer.appendChild(createChatLi(userMessage, "outgoing"));
  setTimeout(() => {
    messagesContainer.appendChild(createChatLi("• • • • •", "incoming"));
  }, 600);
  chatInput.value = "";
}

sendChatButton.addEventListener("click", handleChat);

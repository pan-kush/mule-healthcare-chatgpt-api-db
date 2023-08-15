let messagesList = [];

function getAsssistantResponse (message) {
  messagesList.push({role:"user", content: message});
  renderMessage(message, "user");
  axios.post('http://127.0.0.1:5000/chat' ,{
        "userId": "zx1",
        "messages": messagesList
    }
 ,{
    headers: {
    'client_id': 'aBC',
    'client_secret': 'def',
    'Content-Type': 'application/json'
  }}).then((res) => {
    console.log(res);

    messagesList.push({role: "assistant", content: res.data});
      renderMessage(res.data, 'assistant');
  }).catch((err) => {
    
    renderMessage(res.data.error, 'assistant')
  }) 
}

function sendMessage() {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();
  if (message !== "") {
    getAsssistantResponse(message);
  }
}
function renderMessage (message, actor) {
  const chatWindow = document.querySelector(".chat-messages");
  const chatMessage = document.createElement("div");
  chatMessage.classList.add("chat-message");
  if(actor === "user"){
    chatMessage.classList.add("chat-message--left");
  }
  chatMessage.textContent = (actor === "assistant" ? "A: " : "You: ") + message;
  chatWindow.append(chatMessage);
  document.getElementById("chatInput").value = "";
}
 
document.querySelector(".chat-window-header")
  .addEventListener("click", function () {
  document.querySelector(".chat-window").classList.toggle("collapsed");
});
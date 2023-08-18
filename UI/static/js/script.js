let messagesList = [];

function getAsssistantResponse (message) {
  messagesList.push({role:"user", content: message});
  renderMessage(message, "user");
  axios.post('http://127.0.0.1:5000/chat' ,{
        "userId": "zx1",
        "messages": messagesList.slice(-3,)
    }
 ,{
    headers: {
    'client_id': 'aBC',
    'client_secret': 'def',
    'Content-Type': 'application/json'
  }}).then((res) => {
    console.log(res);
    var button = document.getElementById("send-button");
    button.disabled = false;
    var button2 = document.getElementById("chatInput");
    button2.disabled = false;
    document.querySelector("#send-button").classList.toggle("disabled")
    
    if (typeof res.data === "object")
    {
    messagesList.push({role: "assistant", content: res.data.error});
      renderMessage(res.data.error, 'assistant');
    }
    else {
      messagesList.push({role: "assistant", content: res.data});
      renderMessage(res.data, 'assistant');
    }
  }).catch((err) => {
    
    renderMessage(res.data, 'assistant')
  }) 
}

function sendMessage() {
  var button = document.getElementById("send-button");
  button.disabled = true;
  var button2 = document.getElementById("chatInput");
  button2.disabled = true;
  document.querySelector("#send-button").classList.toggle("disabled")
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
  chatMessage.textContent = (actor === "assistant" ? "Assistant: " : "You: ") + message;
  chatWindow.append(chatMessage);
  document.getElementById("chatInput").value = "";

  chatWindow.scrollTop = chatWindow.scrollHeight;
}
 
document.querySelector(".chat-window-header")
  .addEventListener("click", function () {
  document.querySelector(".chat-window").classList.toggle("collapsed");


});
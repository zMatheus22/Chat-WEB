const socket = io("http://localhost:3000");

let user = null;

// Aqui o Front end escreve a messagem, na tela do Chat.
socket.on("update_messages", (messages) => {
  updateMessagesOnScreen(messages);
});

//Function para escrever a messagem na tela, ("User": "Messagem")
function updateMessagesOnScreen(messages) {
  const div_messages = document.getElementById("messages");

  let list_messages = "<ul>";
  messages.forEach((messages) => {
    list_messages += `<li>${messages.user}: ${messages.msg}</li>`;
  });
  list_messages += "</ul>";

  div_messages.innerHTML = list_messages;
}

document.addEventListener("DOMContentLoaded", () => {
  const formMessage = document.getElementById("message_form");
  formMessage.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!user) {
      alert("Defina um usuario");
      return;
    }
    //Recebe a messagem do usuario.
    const message = document.forms["message_form_name"]["msg"].value;
    //Limpa o input da messagem
    document.forms["message_form_name"]["msg"].value = "";
    //Envia o user e a msg para o Back End, com a *messgem de "new_messagem"*, com isso o Back End escreve a menssagem na tela (function updateMessagesOnScreen).
    socket.emit("new_message", { user: user, msg: message });
    console.log(user);
  });

  //Front end lendo o Usuario
  const formUser = document.getElementById("user_form");
  formUser.addEventListener("submit", (e) => {
    e.preventDefault();
    user = document.forms["user_form_name"]["user"].value;
    formUser.parentNode.removeChild(formUser);
  });
});

const socket = io("http://localhost:3000");

let user = null;

socket.on("update_messages", (messages) => {
  updateMessagesOnScreen(messages);
});

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
    if(!user){
        alert('Defina um usuario');
        return;
    }
    const message = document.forms["message_form_name"]["msg"].value;
    document.forms["message_form_name"]["msg"].value = "";
    socket.emit('new_message', {user: user, msg: message})
  });

  const formUser = document.getElementById("user_form");
  formUser.addEventListener("submit", (e) => {
    e.preventDefault();
    user = document.forms["user_form_name"]["user"].value;
    formUser.parentNode.removeChild(formUser)
  });
});

const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio= new Audio('ringtone2.mp3')
const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if(position=='left'){
      audio.play()
  }
};

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value
    append(`You: ${message}`,'right')
    socket.emit('send',message)
    messageInput.value=''
})

const data = prompt("Enter name to join chat");
socket.emit('new-user-joined', data);
socket.on('user-joined', data => {
    const passdata=`${data} joined the chat`
  append(passdata, 'right');
});
socket.on('received', data => {
  append(`${data.name}:${data.message}`, 'left');
});
socket.on('left', data => {
    append(`${data} left the chat`, 'left');
  });
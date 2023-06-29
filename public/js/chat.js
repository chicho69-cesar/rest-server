let user = null;
let socket = null;

const txtUid = document.querySelector('#txtUid');
const txtMessage = document.querySelector('#txtMessage');
const ulUsers = document.querySelector('#ulUsers');
const ulMessages = document.querySelector('#ulMessages');
const btnLogout = document.querySelector('#btnLogout');

// Validate the token of the local storage
const validateJWT = async () => {
  const token = localStorage.getItem('token') || '';

  if (token.length < 10) {
    window.location = 'index.html';
    throw new Error('No token found');
  }

  const response = await fetch('http://localhost:8080/api/auth/', {
    headers: { 'x-token': token }
  });

  const { user: userDB, token: tokenDB } = await response.json();
  localStorage.setItem('token', tokenDB);

  user = userDB;
  document.title = user.name;

  await connectSocket();
}

// Authenticate the socket with the server
const connectSocket = async () => {
  socket = io({
    extraHeaders: {
      'x-token': localStorage.getItem('token')
    }
  });

  socket.on('connect', () => {
    console.log('sockets online');
  });

  socket.on('disconnect', () => {
    console.log('sockets offline');
  });

  socket.on('receive-messages', printMessages);
  socket.on('users-active', printUsers);

  socket.on('message-private', (payload) => {
    console.log(payload);
  });
}

const printUsers = (users = []) => {
  let usersHTML = '';
  users.forEach(({ uid, name }) => {
    usersHTML += `
      <li>
        <p>
          <h5 class="text-success">${name}</h5>
          <span class="fs-6 text-muted">${uid}</span>
        </p>
      </li>
    `;
  });

  ulUsers.innerHTML = usersHTML;
}

const printMessages = (messages = []) => {
  let messagesHTML = '';
  messages.forEach(({ message, name }) => {
    messagesHTML += `
      <li>
        <p>
          <span class="text-primary">${name}: </span>
          <span>${message}</span>
        </p>
      </li>
    `;
  });

  ulMessages.innerHTML = messagesHTML;
}

txtMessage.addEventListener('keyup', ({ keyCode }) => {
  const message = txtMessage.value;
  const uid = txtUid.value;

  if (keyCode !== 13) return;
  if (message.length === 0) return;

  socket.emit('send-message', { message, uid });
  txtMessage.value = '';
});

const main = async () => {
  await validateJWT();
}

main();

let user = null;
let socket = null;

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
  const socket = io({
    extraHeaders: {
      'x-token': localStorage.getItem('token')
    }
  });
}

const main = async () => {
  await validateJWT();
}

main();

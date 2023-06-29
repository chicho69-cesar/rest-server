const myForm = document.querySelector('form');

function handleCredentialResponse(response) {
  // Google Token: ID_TOKEN
  // const responsePayload = decodeJwtResponse(response.credential);
  // console.log(response.credential);

  const body = {
    id_token: response.credential
  };

  fetch('http://localhost:8080/api/auth/google', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(resp => resp.json())
    .then(data => {
      const { token } = data;

      console.log(data);
      console.log(token);

      localStorage.setItem('email', data.user.email);
      localStorage.setItem('token', token);
      window.location = 'chat.html';
    })
    .catch(console.warn);
}

const button = document.getElementById('google_signout');
button.onclick = () => {
  console.log(google.accounts.id);
  google.accounts.id.disableAutoSelect();

  google.accounts.id.revoke(localStorage.getItem('email'), done => {
    localStorage.clear();
    location.reload();
  });
}

myForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = {};

  for (let el of myForm.elements) {
    if (el.name.length > 0) {
      formData[el.name] = el.value;
    }
  }

  fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(resp => resp.json())
    .then(({ msg, token }) => {
      if (msg) {
        return console.error(msg);
      }

      localStorage.setItem('token', token);
      window.location = 'chat.html';
    })
    .catch(err => console.error(err));
});

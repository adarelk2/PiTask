// public/js/init.js
(function () {
  const token = localStorage.getItem('token');
  if (token) {
    fetch('/auth/getUserByToken', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject('unauthenticated'))
    .then(data => {
      window.user = data.user;
      document.getElementById('user-info').innerText = `Welcome ${user.username}`;
    })
    .catch(err => {
      console.warn('User not logged in:', err);
    });
  }
  })();
  
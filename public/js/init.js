// public/js/init.js
(function () {
    const token = localStorage.getItem('token');
    if (token) {
      window.__AUTH_TOKEN__ = token;
    }
  
    // טען את המשתמש מהשרת
    fetch('/auth/getUserByToken', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject('unauthenticated'))
    .then(data => {
      // שמור את המשתמש כ־window.user
      window.user = data.user;
      // תוכל למשל להציג אותו:
      const userSpan = document.getElementById('user-info');
      if (userSpan) userSpan.innerText = `Welcome ${user.username}`;
    })
    .catch(err => {
      console.warn('User not logged in:', err);
    });
  })();
  
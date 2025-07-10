
  document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    console.log("here 4");
    console.log(token);
    if (!token) return;

    document.querySelectorAll('a[data-link]').forEach(link => {
        console.log(link);
      const baseHref = link.getAttribute('data-link');
      link.setAttribute('href', `${baseHref}?token=${encodeURIComponent(token)}`);
    });
  });


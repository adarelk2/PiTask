
  document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    console.log("here 4");
    console.log(token);
    if (!token) return;

    document.querySelectorAll('.menu-linkk').forEach(link => {
        console.log(link);
      const baseHref = link.getAttribute('href');
      if(baseHref)
      {
        link.setAttribute('href', `${baseHref}?token=${encodeURIComponent(token)}`);
      }
    });
  });


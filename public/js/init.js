
  document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    if (!token) return;

    document.querySelectorAll('a[data-link]').forEach(link => {
      const baseHref = link.getAttribute('data-link');
      link.setAttribute('href', `${baseHref}?token=${encodeURIComponent(token)}`);
    });
  });



  document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    console.log("here 4");
    console.log(token);
    if (!token) return;

    document.querySelectorAll('.menu-link').forEach(link => {
        console.log(link);
      const baseHref = link.getAttribute('href');
      if(baseHref)
      {
        link.setAttribute('href', `${baseHref}?token=${encodeURIComponent(token)}`);
      }
    });
  });

  function showLoading()
  {
    Swal.fire({
      title:'Loading...',
      html: `<img src=/loading.gif style='width:56px; height:56px;'>`,
      showCancelButton: false, // There won't be any cancel button
      showConfirmButton: false // There won't be any confirm button
    });
  }

  function showPopUpConfirming(_callback, _params)
  {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
       _callback(_params);
      } 
    });
  }

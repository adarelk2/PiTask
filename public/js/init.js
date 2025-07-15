
  document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    const lang = localStorage.getItem('lang');
    document.querySelectorAll('.menu-link').forEach(link => {
        console.log(link);
      const baseHref = link.getAttribute('href');
      if(baseHref)
      {
        link.setAttribute('href', `${baseHref}?token=${encodeURIComponent(token)}&lang=${lang}`);
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

  function successAlert(_str, _callback=false)
  {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your requiest has been done",
      showConfirmButton: true,
    }).then(()=>{
      if(_callback)
        _callback();
    });
  }

  function failedAlert(_errors, _title="error")
  {
    const errors = _errors.join("<br>");
    console.log(errors);
    Swal.fire({
      position: "top-end",
      icon: "error",
      html: `${errors}`,
      title: _title,
      showConfirmButton: true,
    });
  }

  function changeLanguage(_ln)
  {
    localStorage.setItem('lang', _ln)
    const token = localStorage.getItem("token");
    location.replace(`/?token=${token}&lang=${_ln}`)
    console.log(_ln)
  }
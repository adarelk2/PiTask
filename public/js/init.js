
  const lang = localStorage.getItem('lang') ?? 'en';
  
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

  function getAllParams(url = window.location.href) {
  const params = {};
  const queryString = url.split('?')[1]?.split('#')[0]; // Get part after "?" and before "#"

  if (!queryString) return params;

  queryString.split('&').forEach(pair => {
    const [key, value] = pair.split('=');
    params[decodeURIComponent(key)] = decodeURIComponent(value || '');
  });

  return params;
}


  function showLoading()
  {
    Swal.fire({
      title:'Loading...',
      html: `<div class="loading-spinner mx-auto"></div>`,
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      customClass: {
        popup: 'swal2-popup-modern'
      }
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
      reverseButtons: true,
      customClass: {
        popup: 'swal2-popup-modern',
        confirmButton: 'btn btn-warning',
        cancelButton: 'btn btn-secondary'
      }
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
      title: "Success!",
      text: _str,
      showConfirmButton: true,
      timer: 3000,
      timerProgressBar: true,
      toast: true,
      customClass: {
        popup: 'swal2-popup-modern success-animation'
      }
    }).then(()=>{
      if(_callback)
        _callback();
    });
  }

  function failedAlert(_errors, _title="Error")
  {
    const errors = Array.isArray(_errors) ? _errors.join("<br>") : _errors;
    console.log(errors);
    Swal.fire({
      position: "top-end",
      icon: "error",
      html: `${errors}`,
      title: _title,
      showConfirmButton: true,
      toast: true,
      customClass: {
        popup: 'swal2-popup-modern shake-animation'
      }
    });
  }

  // New modern alert functions
  function infoAlert(_message, _title="Information")
  {
    Swal.fire({
      position: "top-end",
      icon: "info",
      title: _title,
      text: _message,
      showConfirmButton: true,
      timer: 4000,
      timerProgressBar: true,
      toast: true,
      customClass: {
        popup: 'swal2-popup-modern info-animation'
      }
    });
  }

  function warningAlert(_message, _title="Warning")
  {
    Swal.fire({
      position: "top-end",
      icon: "warning",
      title: _title,
      text: _message,
      showConfirmButton: true,
      timer: 5000,
      timerProgressBar: true,
      toast: true,
      customClass: {
        popup: 'swal2-popup-modern warning-animation'
      }
    });
  }

  function paymentSuccessAlert(_message="Payment completed successfully!")
  {
    Swal.fire({
      icon: "success",
      title: "Payment Successful!",
      text: _message,
      showConfirmButton: true,
      confirmButtonText: "Great!",
      customClass: {
        popup: 'swal2-popup-modern payment-success-animation',
        confirmButton: 'btn btn-success'
      }
    });
  }

  function paymentErrorAlert(_message="Payment failed. Please try again.")
  {
    Swal.fire({
      icon: "error",
      title: "Payment Failed",
      text: _message,
      showConfirmButton: true,
      confirmButtonText: "OK",
      customClass: {
        popup: 'swal2-popup-modern payment-error-animation',
        confirmButton: 'btn btn-danger'
      }
    });
  }

  function validationAlert(_message, _title="Validation Error")
  {
    Swal.fire({
      position: "top-end",
      icon: "warning",
      title: _title,
      text: _message,
      showConfirmButton: true,
      toast: true,
      customClass: {
        popup: 'swal2-popup-modern validation-animation'
      }
    });
  }

  function changeLanguage(_ln)
  {
    localStorage.setItem('lang', _ln)
    const token = localStorage.getItem("token");
    location.replace(`/?token=${token}&lang=${_ln}`)
    console.log(_ln)
  }

  // Add modern interactive features
  document.addEventListener('DOMContentLoaded', function() {
    // Add click animations to buttons
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('click', function(e) {
        this.classList.add('bounce-animation');
        setTimeout(() => {
          this.classList.remove('bounce-animation');
        }, 1000);
      });
    });

    // Add hover effects to cards
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Add form validation animations
    document.querySelectorAll('input, textarea, select').forEach(input => {
      input.addEventListener('invalid', function() {
        this.classList.add('shake-animation');
        setTimeout(() => {
          this.classList.remove('shake-animation');
        }, 600);
      });

      input.addEventListener('input', function() {
        if (this.classList.contains('shake-animation')) {
          this.classList.remove('shake-animation');
        }
      });
    });

    // Add loading states to forms
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', function() {
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.classList.add('loading');
          submitBtn.disabled = true;
        }
      });
    });

    // Add scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.card, .alert, .form-section').forEach(el => {
      observer.observe(el);
    });
  });

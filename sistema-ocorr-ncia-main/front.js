const form = document.getElementById('registrationForm');
form.addEventListener('submit', (event) => {
  event.preventDefault(); 

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (name === '' || email === '' || password === '') {
    alert('Please fill in all fields.');
    return;
  }

});

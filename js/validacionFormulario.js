const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

  // Obtener los valores del formulario
  const nombre = document.querySelector('#nombre').value;
  const email = document.querySelector('#email').value;
  const mensaje = document.querySelector('#mensaje').value;

  // Crear un objeto con los datos del formulario
  const formData = {
    nombre: nombre,
    email: email,
    mensaje: mensaje
  };

  // Enviar los datos al servidor
  fetch('/enviar-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (response.ok) {
      alert('Mensaje enviado correctamente');
    } else {
      alert('Ha ocurrido un error, por favor inténtalo de nuevo más tarde');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Ha ocurrido un error, por favor inténtalo de nuevo más tarde');
  });
});

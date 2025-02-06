document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-item');

    // Mostrar la primera sección
    showSection('about');

    // Manejar clics en el menú
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = item.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });

    function showSection(id) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(id).classList.add('active');

        navItems.forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`.nav-item[href="#${id}"]`).classList.add('active');
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('.skill-card');
    const skillMessage = document.getElementById('skill-message');

    // Diccionario de mensajes para cada skill
    const messages = {
        html: "HTML: 'Structure your ideas, build your dreams!'<br><code>&lt;h1&gt;Hello, World!&lt;/h1&gt;</code>",
        css: "CSS: 'Make the web beautiful!'<br><code>body { background-color: #f9f9f9; }</code>",
        javascript: "JavaScript: 'Bringing life to the web!'<br><code>console.log('Hello, World!');</code>",
        react: "React: 'Reusable components for a better world!'<br><code>const Button = () => &lt;button&gt;Click Me&lt;/button&gt;;</code>",
        nodejs: "Node.js: 'Run JavaScript everywhere!'<br><code>console.log('Server running...');</code>",
        mysql: "MySQL: 'Data stored, dreams secured!'<br><code>SELECT * FROM users;</code>",
    };

    // Agregar evento a cada skill
    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            const skill = card.getAttribute('data-skill');
            skillMessage.innerHTML = messages[skill]; // Cambia el mensaje dinámicamente
            skillMessage.classList.add('show');

            // Ocultar después de 5 segundos
            setTimeout(() => {
                skillMessage.classList.remove('show');
            }, 5000);
        });
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const formResponse = document.getElementById("form-response");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que la página se recargue

        // Crea un objeto FormData con los datos del formulario
        const formData = new FormData(form);

        // Enviar datos a Google Forms
        fetch("https://docs.google.com/forms/u/0/d/1sisj0_qF5io2RMbpCCG-Gida12ONMrY5qX1EDbVRz2s/formResponse", {
            method: "POST",
            body: formData,
            mode: "no-cors",
        }).then(() => {
            // Muestra el mensaje de confirmación
            formResponse.classList.remove("hidden");
            form.reset(); // Limpia el formulario después del envío

            // Oculta el mensaje después de 5 segundos
            setTimeout(() => {
                formResponse.classList.add("hidden");
            }, 5000);
        }).catch((error) => {
            console.error("Error:", error);
        });
    });
});

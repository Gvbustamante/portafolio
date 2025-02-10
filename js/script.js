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


document.addEventListener("DOMContentLoaded", function () {
    const skillCards = document.querySelectorAll(".skill-card");
    const tooltip = document.getElementById("tooltip-message");

    // 🎯 Mensajes personalizados por cada habilidad
    const skillMessages = {
        html: "📜 HTML es la base de la web, estructura todo el contenido.",
        css: "🎨 CSS da estilo y vida a los sitios web.",
        javascript: "⚡ JavaScript hace todo interactivo y dinámico.",
        react: "⚛️ React crea interfaces rápidas y reutilizables.",
        nodejs: "🌍 Node.js permite usar JavaScript en el backend.",
        mysql: "🗄️ MySQL almacena datos de manera eficiente y estructurada.",
        bootstrap: "📱 Bootstrap facilita diseños responsivos y modernos.",
        shopify: "🛒 Shopify permite crear tiendas online sin código.",
        wordpress: "🌍 WordPress es el CMS más usado para crear sitios web dinámicos."
    };

    // Evento de clic en cada habilidad
    skillCards.forEach(card => {
        card.addEventListener("click", () => {
            const skill = card.getAttribute("data-skill");

            if (skillMessages[skill]) {
                tooltip.textContent = skillMessages[skill]; // Muestra el mensaje
                tooltip.classList.add("show");

                // Ocultar después de 3 segundos
                setTimeout(() => {
                    tooltip.classList.add("hide");

                    // Elimina clases después de la animación para volver a usarlo
                    setTimeout(() => {
                        tooltip.classList.remove("show", "hide");
                    }, 500);
                }, 5000);
            }
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


document.addEventListener("DOMContentLoaded", function () {
    const carousels = document.querySelectorAll(".slide-container");

    carousels.forEach((carousel) => {
        const slides = carousel.querySelectorAll(".project-slide");
        const prevButton = carousel.querySelector(".prev-button");
        const nextButton = carousel.querySelector(".next-button");

        let currentIndex = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove("active");
                if (i === index) {
                    slide.classList.add("active");
                }
            });
        }

        prevButton.addEventListener("click", () => {
            currentIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
            showSlide(currentIndex);
        });

        nextButton.addEventListener("click", () => {
            currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
            showSlide(currentIndex);
        });

        showSlide(currentIndex);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    gsap.from(".about-container", { opacity: 0, y: 50, duration: 1 });
});

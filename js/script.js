document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.section');

    // Mostrar la primera sección por defecto
    sections[0].style.display = 'flex';
    sections[0].classList.add('active-section');

    // Manejar los clics del sidebar
    menuItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            // Cambiar las secciones visiblemente
            sections.forEach((section) => {
                section.style.display = 'none';
                section.classList.remove('active-section');
            });
            sections[index].style.display = 'flex';
            sections[index].classList.add('active-section');

            // Opcional: añadir clase activa al menú
            menuItems.forEach((menuItem) => menuItem.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Toggle del sidebar
    const sidebar = document.querySelector('.sidebar');
    const toggleButton = document.querySelector('.menu-toggle');

    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');

        if (sidebar.classList.contains('collapsed')) {
            sidebar.style.width = '60px';
        } else {
            sidebar.style.width = '250px';
        }
    });
});

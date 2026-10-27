document.addEventListener('DOMContentLoaded', () => {

    // --- Menú Hamburguesa para Móviles ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Cambiar icono de hamburguesa a X
        const icon = mobileMenu.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Cerrar el menú al hacer clic en un enlace (en móviles)
    const links = document.querySelectorAll('.nav-links li a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                mobileMenu.querySelector('i').classList.remove('fa-times');
                mobileMenu.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // --- Efecto de sombra en el header al hacer scroll ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });

    // --- Evitar recarga del formulario (Simulación de envío) ---
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Aquí puedes conectar a una API o backend usando Fetch/AJAX
            alert('¡Gracias por tu interés! Hemos recibido tu solicitud. Nos pondremos en contacto contigo a la brevedad.');
            quoteForm.reset();
        });
    }
});
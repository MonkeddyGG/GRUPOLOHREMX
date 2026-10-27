document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Menú Móvil ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenu.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Cerrar menú al hacer clic en un enlace
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                mobileMenu.querySelector('i').classList.replace('fa-times', 'fa-bars');
            }
        });
    });

    // --- 2. Efecto Header Scrolled ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // --- 3. Scroll Reveal Animaciones ---
    const reveals = document.querySelectorAll('.reveal');
    const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');

            // Si el elemento contiene contadores, activarlos
            if (entry.target.classList.contains('stat-grid')) {
                iniciarContadores();
            }

            observer.unobserve(entry.target); // Solo animar una vez
        });
    }, revealOptions);

    reveals.forEach(reveal => revealOnScroll.observe(reveal));

    // --- 4. Animación de Contadores (Estadísticas) ---
    let contadoresIniciados = false;
    function iniciarContadores() {
        if (contadoresIniciados) return;
        contadoresIniciados = true;
        const counters = document.querySelectorAll('.counter');
        const speed = 200; // La velocidad, a menor número, más rápido.

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15); // FPS de la animación
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    // --- 5. Acordeón de FAQ ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');

            // Cerrar todos los demás
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.style.maxHeight = null;
            });

            // Si no estaba activo, abrir el seleccionado
            if (!isActive) {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // --- 6. Formulario Simulado ---
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = quoteForm.querySelector('.btn-form');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            btn.style.opacity = '0.8';

            // Simular petición HTTP
            setTimeout(() => {
                alert('¡Gracias por tu solicitud! Nos comunicaremos contigo a la brevedad para generar tu Render 3D.');
                btn.innerHTML = '<i class="fas fa-check"></i> Enviado';
                btn.style.backgroundColor = '#25d366';
                quoteForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }
});
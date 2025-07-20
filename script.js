document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul.dropdown");
    const dropdownItems = document.querySelectorAll(".dropdown-item");
    const menuLinks = document.querySelectorAll("nav ul.dropdown a");

    // Asegúrate de que el HTML del menu-toggle contenga ambos íconos
    if (!menuToggle.querySelector(".fa-bars") || !menuToggle.querySelector(".fa-times")) {
        menuToggle.innerHTML = '<i class="fas fa-bars"></i><i class="fas fa-times"></i>';
    }

    // Toggle mobile menu and change icon
    menuToggle.addEventListener("click", function() {
        navMenu.classList.toggle("active");
        menuToggle.classList.toggle("open"); // Alterna la clase 'open' para cambiar el ícono
    });

    // Toggle dropdown submenus on mobile
    dropdownItems.forEach(item => {
        item.addEventListener("click", function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                item.classList.toggle("active");
            }
        });
    });

    // Desplazamiento suave avanzado con requestAnimationFrame
    function smoothScroll(targetY) {
        const startY = window.scrollY;
        const distance = targetY - startY;
        const duration = 800; // Duración en milisegundos
        let startTime = null;

        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            const progress = currentTime - startTime;
            const easeInOut = ease(progress, startY, distance, duration);
            window.scrollTo(0, easeInOut);
            if (progress < duration) {
                requestAnimationFrame(animation);
            }
        }

        // Función de easing (suavizado)
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Manejo de clics en enlaces del menú
    menuLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                navMenu.classList.remove("active"); // Cierra el menú
                menuToggle.classList.remove("open"); // Vuelve al ícono de barras
                const targetSection = document.querySelector(link.getAttribute("href"));
                setTimeout(() => {
                    smoothScroll(targetSection.offsetTop - 60); // Ajuste por el header
                }, 100); // Pequeño retraso para que el cierre sea visible
            } else {
                e.preventDefault();
                const targetSection = document.querySelector(link.getAttribute("href"));
                smoothScroll(targetSection.offsetTop - 60); // Ajuste por el header
            }
        });
    });

    const sections = document.querySelectorAll(".content");

    // Assign random animations to each section
    const animations = ["fade", "slide-left", "slide-right", "scale"];
    sections.forEach(section => {
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        section.setAttribute("data-animation", randomAnimation);
    });

    function checkVisibility() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top >= 0 && rect.top < windowHeight * 0.75 && !section.classList.contains("visible")) {
                section.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", checkVisibility);
    window.addEventListener("resize", checkVisibility);
    checkVisibility(); // Initial check
});
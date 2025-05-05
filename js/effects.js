// Verificar si el usuario prefiere reducir el movimiento
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Cursor personalizado (solo si no se prefiere reducir el movimiento)
if (!prefersReducedMotion) {
    const cursor = document.createElement('div');
    const cursorFollower = document.createElement('div');
    cursor.className = 'cursor';
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
}

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

if (!prefersReducedMotion) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
}

// Animación suave del cursor
function animate() {
    if (!prefersReducedMotion) {
        // Cursor principal
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;

        // Seguidor del cursor
        followerX += (mouseX - followerX) * 0.2;
        followerY += (mouseY - followerY) * 0.2;
        cursorFollower.style.transform = `translate(${followerX - 4}px, ${followerY - 4}px)`;

        requestAnimationFrame(animate);
    }
}

if (!prefersReducedMotion) {
    animate();
}

// Efectos hover del cursor
const hoverElements = document.querySelectorAll('a, button, .concept-card');
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = `translate(${cursorX - 15}px, ${cursorY - 15}px) scale(1.5)`;
        cursor.style.background = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
        cursor.style.opacity = '0.5';
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px) scale(1)`;
        cursor.style.background = 'transparent';
        cursor.style.opacity = '1';
    });
});

// Esperamos a que el DOM esté completamente cargado
// Efecto parallax para las tarjetas
function handleCardParallax(e, card) {
    if (prefersReducedMotion) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);
    const maxRotate = 5;

    card.style.transform = `perspective(1000px) rotateX(${-percentY * maxRotate}deg) rotateY(${percentX * maxRotate}deg)`;
}

document.addEventListener('DOMContentLoaded', () => {
    // Inicialización de animaciones de scroll
    const scrollElements = document.querySelectorAll('.language-grid, .concept-card');
    
    // Mostrar todos los elementos inmediatamente
    scrollElements.forEach(element => {
        element.classList.add('visible');
    });



    // Barra de progreso de scroll
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);

    const updateScrollProgress = () => {
        const windowScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (windowScroll / height) * 100;
        scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
    };

    // Event listeners
    window.addEventListener('scroll', () => {
        updateScrollProgress();
    });

    // Inicialización
    updateScrollProgress();

    // Añadir efecto parallax a las tarjetas
    const cards = document.querySelectorAll('.concept-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => handleCardParallax(e, card));
        card.addEventListener('mouseleave', () => {
            if (prefersReducedMotion) return;
            card.style.transform = 'none';
        });
    });

    // Animaciones de texto
    document.querySelectorAll('.text-reveal').forEach(element => {
        element.setAttribute('data-text', element.textContent);
    });

    document.querySelectorAll('.split-text').forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animationDelay = `${i * 0.05}s`;
            element.appendChild(span);
        });
    });

    // Toggle del tema oscuro
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            document.body.classList.toggle('dark-theme');
        });
    }

    // Menú móvil
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            sidebar.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace (móvil)
        document.querySelectorAll('.sidebar a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
    }
}); 
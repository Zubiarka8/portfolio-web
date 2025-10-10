// Scripts para Portfolio Web - Arkaitz Zubizarreta

// Inicializar AOS cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Efecto Matrix
    initMatrixEffect();

    // Smooth scrolling para los enlaces del menú
    initSmoothScrolling();

    // Efectos de glitch y neon
    initGlitchEffects();
    initNeonEffects();
});

// Función para inicializar el efecto Matrix
function initMatrixEffect() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Configurar tamaño del canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for(let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px arial';
        
        for(let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 35);
}

// Función para inicializar el smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Función para inicializar efectos de glitch
function initGlitchEffects() {
    setInterval(() => {
        const glitchElements = document.querySelectorAll('.glitch');
        glitchElements.forEach(element => {
            if (Math.random() > 0.95) {
                element.style.animation = 'none';
                setTimeout(() => {
                    element.style.animation = '';
                }, 100);
            }
        });
    }, 1000);
}

// Función para inicializar efectos neon
function initNeonEffects() {
    setInterval(() => {
        const neonElements = document.querySelectorAll('.neon-blue, .neon-pink, .neon-green');
        neonElements.forEach(element => {
            element.style.textShadow = `0 0 ${Math.random() * 20 + 10}px currentColor`;
        });
    }, 2000);
}

// Función para manejar el menú móvil (si se implementa en el futuro)
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Función para animar contadores (si se implementa en el futuro)
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
}

// Función para detectar cuando los elementos están en viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Función para agregar efectos de hover mejorados
function initEnhancedHoverEffects() {
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Inicializar efectos de hover mejorados
document.addEventListener('DOMContentLoaded', initEnhancedHoverEffects);

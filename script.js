// ============ HEADER COM SOMBRA ============
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============ MENU MOBILE ============
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// ============ SCROLL SUAVE ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============ ANIMAÇÃO DOS TIMELINE ITEMS ============
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 150);
            timelineObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -80px 0px'
});

timelineItems.forEach(item => timelineObserver.observe(item));

// ============ CONTADORES ANIMADOS ============
const counters = document.querySelectorAll('.counter');
let countersAnimated = false;

const countersObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            countersAnimated = true;
            animateCounters();
        }
    });
}, { threshold: 0.3 });

const bentoGrid = document.querySelector('.bento-grid');
if (bentoGrid) {
    countersObserver.observe(bentoGrid);
}

function animateCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2200;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out cubic)
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            
            counter.textContent = current.toLocaleString('pt-BR');
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString('pt-BR');
            }
        }
        
        requestAnimationFrame(updateCounter);
    });
}

// ============ FORMULÁRIO ============
const form = document.getElementById('contato-form');
const feedback = document.getElementById('form-feedback');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const assunto = document.getElementById('assunto').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (!nome || !email || !assunto || !mensagem) {
        showFeedback('Por favor, preencha todos os campos.', 'error');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFeedback('Insira um e-mail válido.', 'error');
        return;
    }

    showFeedback('✓ Mensagem enviada! Retornaremos em breve.', 'success');
    form.reset();

    setTimeout(() => {
        feedback.style.display = 'none';
        feedback.classList.remove('success', 'error');
    }, 5000);
});

function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = 'form-feedback ' + type;
}

// ============ PARALLAX SUAVE NA IMAGEM DO HERO ============
const heroImage = document.querySelector('.hero-image img');

window.addEventListener('scroll', () => {
    if (heroImage) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.15;
        if (scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${rate}px) scale(1.05)`;
        }
    }
});

// ============ REVEAL DOS BENTO CARDS ============
const bentoCards = document.querySelectorAll('.bento-card');

const bentoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            
            bentoObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

bentoCards.forEach(card => bentoObserver.observe(card));

// ============ MENSAGEM NO CONSOLE ============
console.log('%c🌾 Raízes do Amanhã', 'color: #8b5a3c; font-size: 24px; font-weight: bold; font-family: Georgia;');
console.log('%cCultivando o amanhã, hoje.', 'color: #6b7a3a; font-size: 14px; font-style: italic;');

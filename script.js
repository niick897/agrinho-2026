// Menu Mobile
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Scroll to top button
    const scrollTop = document.getElementById('scrollTop');
    if (window.scrollY > 500) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

// Scroll to top
document.getElementById('scrollTop').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animação de números (contador)
const animateValue = (obj, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Intersection Observer para animações
const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateValue(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
            
            if (entry.target.classList.contains('pratica-card')) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        }
    });
}, observerOptions);

// Observar elementos
document.querySelectorAll('.stat-number').forEach(stat => {
    stat.style.opacity = '0';
    observer.observe(stat);
});

document.querySelectorAll('.pratica-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Slider de Tecnologias
let currentTech = 0;
const techCards = document.querySelectorAll('.tech-card');
const dots = document.querySelectorAll('.dot');

function showTech(index) {
    techCards.forEach((card, i) => {
        card.classList.remove('active');
        dots[i].classList.remove('active');
        if (i === index) {
            card.classList.add('active');
            dots[i].classList.add('active');
        }
    });
}

function changeTech(direction) {
    currentTech += direction;
    if (currentTech >= techCards.length) currentTech = 0;
    if (currentTech < 0) currentTech = techCards.length - 1;
    showTech(currentTech);
}

function goToTech(index) {
    currentTech = index;
    showTech(currentTech);
}

// Auto-play do slider
setInterval(() => {
    changeTech(1);
}, 5000);

// Calculadora de Sustentabilidade
document.getElementById('calcForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const area = parseFloat(document.getElementById('area').value);
    const agua = parseFloat(document.getElementById('agua').value);
    const energia = parseFloat(document.getElementById('energia').value);
    const praticas = document.querySelectorAll('input[name="pratica"]:checked');
    
    // Cálculos
    const carbonFootprint = ((area * 0.5) + (agua * 0.1) + (energia * 0.05)).toFixed(2);
    const waterEfficiency = Math.min(100, ((1000 - (agua / area)) / 10).toFixed(1));
    const praticasCount = praticas.length;
    const sustainabilityIndex = (praticasCount * 1.5 + (waterEfficiency / 10)).toFixed(1);
    
    // Atualizar resultados
    document.getElementById('carbonFootprint').textContent = `${carbonFootprint} tCO₂/ano`;
    document.getElementById('waterEfficiency').textContent = `${waterEfficiency}%`;
    document.getElementById('sustainabilityIndex').textContent = `${sustainabilityIndex}/10`;
    
    // Gerar recomendações
    const recommendations = [];
    
    if (praticasCount < 3) {
        recommendations.push('Implemente mais práticas sustentáveis como ILPF e plantio direto');
    }
    if (waterEfficiency < 70) {
        recommendations.push('Invista em sistemas de irrigação por gotejamento e captação de água da chuva');
    }
    if (energia > area * 20) {
        recommendations.push('Considere instalar painéis solares para reduzir consumo energético');
    }
    if (!Array.from(praticas).some(p => p.value === 'ilpf')) {
        recommendations.push('A ILPF pode aumentar a produtividade em até 30%');
    }
    if (!Array.from(praticas).some(p => p.value === 'solar')) {
        recommendations.push('Energia solar pode reduzir custos em até 95%');
    }
    
    if (recommendations.length === 0) {
        recommendations.push('Parabéns! Sua propriedade já adota excelentes práticas sustentáveis');
        recommendations.push('Continue monitorando e melhorando seus processos');
    }
    
    const recList = document.getElementById('recList');
    recList.innerHTML = '';
    recommendations.forEach(rec => {
        const li = document.createElement('li');
        li.textContent = rec;
        recList.appendChild(li);
    });
    
    // Mostrar resultados
    document.getElementById('calcForm').style.display = 'none';
    document.getElementById('calcResult').style.display = 'block';
    document.getElementById('calcResult').scrollIntoView({ behavior: 'smooth' });
});

function resetCalc() {
    document.getElementById('calcForm').reset();
    document.getElementById('calcForm').style.display = 'grid';
    document.getElementById('calcResult').style.display = 'none';
    window.scrollTo({
        top: document.getElementById('calculadora').offsetTop - 100,
        behavior: 'smooth'
    });
}

// Formulário de contato
document.getElementById('contatoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulação de envio
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
        btn.style.background = 'var(--secondary-color)';
        
        setTimeout(() => {
            this.reset();
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.style.background = '';
            
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        }, 2000);
    }, 1500);
});

// Smooth scroll para links internos
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

// Efeito de digitação no hero (opcional)
const phrases = [
    'Agro Forte, Futuro Sustentável',
    'Tecnologia e Inovação',
    'Preservação Ambiental',
    'Produção Responsável'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const heroTitle = document.querySelector('.hero h1');

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        heroTitle.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        heroTitle.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeEffect, typeSpeed);
}

// Iniciar efeito de digitação após carregamento
window.addEventListener('load', () => {
    setTimeout(typeEffect, 2000);
});

// Animação de entrada suave para todas as seções
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Adicionar classe CSS para animação fade-in
const style = document.createElement('style');
style.textContent = `
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    section.fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

console.log('🌱 Agro Sustentável - Site carregado com sucesso!');

// ============ HEADER COM SOMBRA ============
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (header && window.scrollY > 30) {
        header.classList.add('scrolled');
    } else if (header) {
        header.classList.remove('scrolled');
    }
});

// ============ MENU MOBILE ============
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        if (nav) nav.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
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
            const headerHeight = header ? header.offsetHeight : 0;
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

if (timelineItems.length > 0) {
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
}

// ============ CONTADORES ANIMADOS (Ajustado para o novo HTML) ============
const counters = document.querySelectorAll('.hero-meta strong');
let countersAnimated = false;

if (counters.length > 0) {
    const countersObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.3 });

    const heroMeta = document.querySelector('.hero-meta');
    if (heroMeta) {
        countersObserver.observe(heroMeta);
    }
}

function animateCounters() {
    counters.forEach(counter => {
        const text = counter.textContent;
        const target = parseInt(text.replace(/[^0-9]/g, ''), 10);
        if (isNaN(target)) return;

        const hasPlus = text.includes('+');
        const hasYears = text.includes('anos');
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            
            let format = current.toLocaleString('pt-BR');
            if (hasPlus) format = '+' + format;
            if (hasYears) format = format + ' anos';
            
            counter.textContent = format;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = text;
            }
        }
        
        requestAnimationFrame(updateCounter);
    });
}

// ============ FORMULÁRIO (Ajustado para as novas IDs) ============
const form = document.querySelector('.contato-form');

if (form) {
    // Cria elemento de feedback dinamicamente caso não exista no HTML
    let feedback = document.getElementById('form-feedback');
    if (!feedback) {
        feedback = document.createElement('div');
        feedback.id = 'form-feedback';
        feedback.className = 'form-feedback';
        feedback.style.display = 'none';
        form.parentNode.insertBefore(feedback, form.nextSibling);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        if (!nome || !email || !mensagem) {
            showFeedback('Por favor, preencha todos os campos.', 'error', feedback);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFeedback('Insira um e-mail válido.', 'error', feedback);
            return;
        }

        showFeedback('✓ Mensagem enviada! Retornaremos em breve.', 'success', feedback);
        form.reset();

        setTimeout(() => {
            feedback.style.display = 'none';
            feedback.classList.remove('success', 'error');
        }, 5000);
    });
}

function showFeedback(message, type, element) {
    element.textContent = message;
    element.className = 'form-feedback ' + type;
    element.style.display = 'block';
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

// ============ REVEAL DOS CARDS (Otimizado) ============
const bentoCards = document.querySelectorAll('.pillar, .timeline-content');

if (bentoCards.length > 0) {
    const bentoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 80);
                
                bentoObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    bentoCards.forEach(card => bentoObserver.observe(card));
}

// ============ RECURSO NOVO: QUIZ INTERATIVO DEDICADO ============
const quizContainer = document.getElementById('quiz-container');

if (quizContainer) {
    const quizQuestions = [
        {
            q: "Qual prática foca no plantio direto e na recuperação da saúde biológica do solo?",
            options: ["Monocultura intensiva", "Agricultura Regenerativa", "Uso massivo de adubo químico"],
            answer: 1,
            explain: "A agricultura regenerativa reconstrói a matéria orgânica do solo e restaura sua biodiversidade."
        },
        {
            q: "Aproximadamente, quanto o agronegócio representa para o PIB brasileiro?",
            options: ["Cerca de 5%", "Cerca de 12%", "Cerca de 25%"],
            answer: 2,
            explain: "O setor representa 25% do PIB, mostrando a importância de torná-lo sustentável."
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    function renderQuiz() {
        if (currentQuestionIndex >= quizQuestions.length) {
            quizContainer.innerHTML = `
                <div class="quiz-results">
                    <h3>Quiz Concluído! 🎉</h3>
                    <p>Você acertou ${score} de ${quizQuestions.length} questões.</p>
                    <p class="quiz-profile-msg">${score === quizQuestions.length ? '🌳 Perfil Guardião da Terra: Conhecimento afiado sobre agroecologia!' : '🌱 Perfil Aprendiz do Campo: Continue explorando práticas sustentáveis.'}</p>
                    <button class="btn btn-dark" onclick="resetQuiz()">Refazer Desafio</button>
                </div>`;
            return;
        }

        const data = quizQuestions[currentQuestionIndex];
        let optionsHtml = data.options.map((opt, i) => `
            <button class="quiz-opt-btn" onclick="checkQuizAnswer(${i})">${opt}</button>
        `).join('');

        quizContainer.innerHTML = `
            <div class="quiz-card">
                <span class="quiz-progress">Pergunta ${currentQuestionIndex + 1} de ${quizQuestions.length}</span>
                <p class="quiz-question">${data.q}</p>
                <div class="quiz-options">${optionsHtml}</div>
                <div id="quiz-feedback" class="quiz-feedback-box" style="display:none;"></div>
            </div>`;
    }

    window.checkQuizAnswer = function(selectedIndex) {
        const data = quizQuestions[currentQuestionIndex];
        const feedbackBox = document.getElementById('quiz-feedback');
        const buttons = document.querySelectorAll('.quiz-opt-btn');
        
        buttons.forEach(btn => btn.disabled = true);
        feedbackBox.style.display = 'block';

        if (selectedIndex === data.answer) {
            score++;
            feedbackBox.className = "quiz-feedback-box success";
            feedbackBox.innerHTML = `<strong>Correto!</strong> ${data.explain}`;
        } else {
            feedbackBox.className = "quiz-feedback-box error";
            feedbackBox.innerHTML = `<strong>Incorreto.</strong> ${data.explain}`;
        }

        setTimeout(() => {

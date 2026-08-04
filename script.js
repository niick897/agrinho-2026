

// ============ CONFIGURAÇÕES GLOBAIS ============
const CONFIG = {
    scrollOffset: 30,
    animationDuration: 2000,
    quizDelay: 3500,
    formResetDelay: 5000,
    observerThreshold: 0.2,
    observerRootMargin: '0px 0px -80px 0px'
};

// ============ UTILITÁRIOS ============
const Utils = {
    // Scroll suave com offset do header
    smoothScroll(targetId) {
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        const header = document.getElementById('header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    },

    // Formatar números com separadores
    formatNumber(num) {
        return num.toLocaleString('pt-BR');
    },

    // Validar email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Mostrar feedback de formulário
    showFormFeedback(message, type, element) {
        element.textContent = message;
        element.className = `form-feedback ${type}`;
        element.style.display = 'block';
    }
};

// ============ HEADER COM SOMBRA ============
function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > CONFIG.scrollOffset) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ============ MENU MOBILE ============
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('.nav');

    if (!menuToggle || !nav) return;

    menuToggle.addEventListener('click', () => {
        const isExpanded = nav.classList.contains('active');
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', !isExpanded);
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// ============ SCROLL SUAVE ============
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            Utils.smoothScroll(targetId);
        });
    });
}

// ============ ANIMAÇÃO DOS TIMELINE ITEMS ============
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: CONFIG.observerThreshold,
        rootMargin: CONFIG.observerRootMargin
    });

    timelineItems.forEach(item => observer.observe(item));
}

// ============ CONTADORES ANIMADOS ============
function initCounters() {
    const counters = document.querySelectorAll('.hero-meta strong');
    if (counters.length === 0) return;

    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                animateCounters(counters);
            }
        });
    }, { threshold: 0.3 });

    const heroMeta = document.querySelector('.hero-meta');
    if (heroMeta) {
        observer.observe(heroMeta);
    }
}

function animateCounters(counters) {
    counters.forEach(counter => {
        const originalText = counter.textContent;
        const target = parseInt(originalText.replace(/[^0-9]/g, ''), 10);
        
        if (isNaN(target)) return;

        const hasPlus = originalText.includes('+');
        const hasYears = originalText.includes('anos');
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / CONFIG.animationDuration, 1);
            
            // Easing function: easeOutCubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            
            let format = Utils.formatNumber(current);
            if (hasPlus) format = '+' + format;
            if (hasYears) format = format + ' anos';
            
            counter.textContent = format;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = originalText;
            }
        }
        
        requestAnimationFrame(update);
    });
}

// ============ FORMULÁRIO DE CONTATO ============
function initContactForm() {
    const form = document.querySelector('.contato-form');
    if (!form) return;

    const successMessage = document.getElementById('form-success');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome');
        const email = document.getElementById('email');
        const assunto = document.getElementById('assunto');
        const mensagem = document.getElementById('mensagem');

        // Limpar erros anteriores
        clearFormErrors();

        let isValid = true;

        // Validar nome
        if (!nome.value.trim()) {
            showError(nome, 'Por favor, preencha seu nome completo.');
            isValid = false;
        }

        // Validar email
        if (!email.value.trim()) {
            showError(email, 'Por favor, preencha seu email.');
            isValid = false;
        } else if (!Utils.isValidEmail(email.value.trim())) {
            showError(email, 'Por favor, insira um email válido.');
            isValid = false;
        }

        // Validar assunto
        if (!assunto.value) {
            showError(assunto, 'Por favor, selecione um assunto.');
            isValid = false;
        }

        // Validar mensagem
        if (!mensagem.value.trim()) {
            showError(mensagem, 'Por favor, escreva sua mensagem.');
            isValid = false;
        } else if (mensagem.value.trim().length < 10) {
            showError(mensagem, 'A mensagem deve ter pelo menos 10 caracteres.');
            isValid = false;
        }

        if (!isValid) return;

        // Simular envio (aqui você integraria com um backend real)
        simulateFormSubmission(form, successMessage);
    });
}

function showError(input, message) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('form-error')) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        input.setAttribute('aria-invalid', 'true');
    }
}

function clearFormErrors() {
    document.querySelectorAll('.form-error').forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
    document.querySelectorAll('.contato-form input, .contato-form select, .contato-form textarea').forEach(input => {
        input.removeAttribute('aria-invalid');
    });
}

function simulateFormSubmission(form, successMessage) {
    // Desabilitar botão durante envio
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    // Simular delay de envio
    setTimeout(() => {
        form.reset();
        successMessage.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;

        // Ocultar mensagem após 5 segundos
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, CONFIG.formResetDelay);
    }, 1000);
}

// ============ QUIZ INTERATIVO ============
function initQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) return;

    const questions = [
        {
            question: "Qual prática agrícola mais contribui para a regeneração do solo?",
            options: [
                { text: "Monocultura intensiva", correct: false },
                { text: "Rotação de culturas com leguminosas", correct: true },
                { text: "Uso intensivo de fertilizantes sintéticos", correct: false },
                { text: "Queimadas controladas", correct: false }
            ],
            explanation: "A rotação de culturas com leguminosas fixa nitrogênio naturalmente no solo, melhora sua estrutura e quebra ciclos de pragas."
        },
        {
            question: "Aproximadamente, quanto o agronegócio representa para o PIB brasileiro?",
            options: [
                { text: "Cerca de 5%", correct: false },
                { text: "Cerca de 12%", correct: false },
                { text: "Cerca de 25%", correct: true },
                { text: "Cerca de 40%", correct: false }
            ],
            explanation: "O setor representa aproximadamente 25% do PIB brasileiro, equivalente a R$ 2,5 trilhões em 2025 (CEPEA/USP)."
        },
        {
            question: "Qual porcentagem do território brasileiro é coberta por vegetação nativa preservada?",
            options: [
                { text: "30%", correct: false },
                { text: "45%", correct: false },
                { text: "66,3%", correct: true },
                { text: "80%", correct: false }
            ],
            explanation: "Segundo a Embrapa, 66,3% do território nacional é coberto por vegetação nativa preservada, muito acima da média mundial."
        },
        {
            question: "Qual sistema integra árvores, culturas agrícolas e animais em uma mesma área?",
            options: [
                { text: "Monocultura", correct: false },
                { text: "Agrofloresta", correct: true },
                { text: "Hidroponia", correct: false },
                { text: "Plantio direto", correct: false }
            ],
            explanation: "A agrofloresta imita a floresta natural, combinando árvores frutíferas, culturas agrícolas e às vezes animais, criando um ecossistema produtivo e sustentável."
        },
        {
            question: "Quanto os sistemas de irrigação inteligente podem reduzir o consumo de água?",
            options: [
                { text: "Até 20%", correct: false },
                { text: "Até 40%", correct: false },
                { text: "Até 60%", correct: true },
                { text: "Até 80%", correct: false }
            ],
            explanation: "Sistemas de gotejamento e sensores de umidade podem reduzir o consumo de água em até 60%, garantindo eficiência no uso dos recursos hídricos."
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let answered = false;

    const questionText = document.getElementById('question-text');
    const questionCurrent = document.getElementById('question-current');
    const questionTotal = document.getElementById('question-total');
    const quizOptions = document.querySelector('.quiz-options');
    const quizNext = document.getElementById('quiz-next');
    const quizResult = document.getElementById('quiz-result');
    const resultCorrect = document.getElementById('result-correct');
    const resultTotal = document.getElementById('result-total');
    const resultMessage = document.getElementById('result-message');
    const feedbackText = document.getElementById('feedback-text');

    questionTotal.textContent = questions.length;

    function renderQuestion() {
        if (currentQuestion >= questions.length) {
            showResults();
            return;
        }

        answered = false;
        const question = questions[currentQuestion];
        
        questionText.textContent = question.question;
        questionCurrent.textContent = currentQuestion + 1;
        
        quizOptions.innerHTML = '';
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'quiz-option';
            button.setAttribute('role', 'radio');
            button.setAttribute('aria-checked', 'false');
            button.innerHTML = `
                <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                <span class="option-text">${option.text}</span>
            `;
            button.addEventListener('click', () => selectOption(index, option.correct));
            quizOptions.appendChild(button);
        });

        quizNext.disabled = true;
        quizNext.style.display = 'block';
    }

    function selectOption(index, isCorrect) {
        if (answered) return;
        answered = true;

        const options = quizOptions.querySelectorAll('.quiz-option');
        options.forEach((opt, i) => {
            opt.disabled = true;
            opt.setAttribute('aria-checked', 'false');
            
            if (questions[currentQuestion].options[i].correct) {
                opt.classList.add('correct');
            }
            
            if (i === index) {
                opt.setAttribute('aria-checked', 'true');
                if (isCorrect) {
                    opt.classList.add('correct');
                    score++;
                } else {
                    opt.classList.add('incorrect');
                }
            }
        });

        // Mostrar explicação
        const explanation = document.createElement('div');
        explanation.className = 'quiz-explanation';
        explanation.innerHTML = `
            <p><strong>${isCorrect ? '✓ Correto!' : '✗ Incorreto.'}</strong></p>
            <p>${questions[currentQuestion].explanation}</p>
        `;
        quizOptions.parentNode.insertBefore(explanation, quizNext);

        quizNext.disabled = false;
    }

    quizNext.addEventListener('click', () => {
        const explanation = document.querySelector('.quiz-explanation');
        if (explanation) explanation.remove();
        
        currentQuestion++;
        renderQuestion();
    });

    function showResults() {
        document.getElementById('quiz-question').style.display = 'none';
        quizResult.style.display = 'block';

        resultCorrect.textContent = score;
        resultTotal.textContent = questions.length;

        const percentage = (score / questions.length) * 100;

        if (percentage === 100) {
            resultMessage.textContent = '🌳 Excelente! Perfil Guardião da Terra';
            feedbackText.textContent = 'Você tem um conhecimento profundo sobre práticas sustentáveis e agroecologia. Continue disseminando esse conhecimento!';
        } else if (percentage >= 60) {
            resultMessage.textContent = '🌱 Muito bem! Perfil Agricultor Consciente';
            feedbackText.textContent = 'Você tem bons conhecimentos sobre sustentabilidade. Continue aprendendo para se tornar um especialista!';
        } else {
            resultMessage.textContent = '📚 Continue aprendendo! Perfil Aprendiz do Campo';
            feedbackText.textContent = 'Você está no caminho certo. Explore mais sobre práticas agroecológicas e seu impacto positivo.';
        }
    }

    window.reiniciarQuiz = function() {
        currentQuestion = 0;
        score = 0;
        document.getElementById('quiz-question').style.display = 'block';
        quizResult.style.display = 'none';
        renderQuestion();
    };

    renderQuestion();
}

// ============ MODAIS ============
function initModals() {
    const modalContent = {
        agrofloresta: {
            title: 'Agroflorestas: Imitando a Natureza',
            content: `
                <h4>O que são?</h4>
                <p>Sistemas agroflorestais (SAFs) combinam árvores, culturas agrícolas e, muitas vezes, animais em uma mesma área, imitando a estrutura de uma floresta natural.</p>
                
                <h4>Benefícios</h4>
                <ul>
                    <li><strong>Diversificação da produção:</strong> Múltiplos produtos (frutas, madeira, grãos) em diferentes épocas</li>
                    <li><strong>Recuperação de solos:</strong> As árvores aportam matéria orgânica e nutrientes</li>
                    <li><strong>Conservação da biodiversidade:</strong> Cria habitat para fauna e flora nativas</li>
                    <li><strong>Sequestro de carbono:</strong> As árvores capturam CO₂ da atmosfera</li>
                    <li><strong>Proteção hídrica:</strong> As raízes profundas ajudam a manter os lençóis freáticos</li>
                </ul>
                
                <h4>Exemplos práticos</h4>
                <p>No Brasil, sistemas como o "cacau cabruca" na Bahia e os sistemas tradicionais indígenas demonstram o sucesso dessa prática há séculos.</p>
            `
        },
        rotacao: {
            title: 'Rotação e Consórcio de Culturas',
            content: `
                <h4>O que é?</h4>
                <p>Rotação de culturas é o plantio alternado de diferentes espécies na mesma área ao longo do tempo. Consórcio é o cultivo simultâneo de duas ou mais culturas.</p>
                
                <h4>Como funciona?</h4>
                <p>Diferentes plantas extraem e devolvem nutrientes de formas distintas. Leguminosas (como feijão e soja) fixam nitrogênio do ar no solo através de bactérias em suas raízes.</p>
                
                <h4>Benefícios</h4>
                <ul>
                    <li><strong>Melhoria da fertilidade:</strong> Reduz necessidade de fertilizantes químicos</li>
                    <li><strong>Quebra de ciclos de pragas:</strong> Dificulta a proliferação de doenças específicas</li>
                    <li><strong>Controle de ervas daninhas:</strong> Plantas com diferentes arquiteturas competem melhor</li>
                    <li><strong>Proteção do solo:</strong> Cobertura vegetal constante previne erosão</li>
                </ul>
                
                <h4>Exemplo clássico</h4>
                <p>Milho + feijão: o milho serve de suporte para o feijão, que fixa nitrogênio beneficiando ambas as culturas.</p>
            `
        },
        irrigacao: {
            title: 'Irrigação Inteligente e Gestão Hídrica',
            content: `
                <h4>O que é?</h4>
                <p>Sistemas de irrigação de precisão que fornecem água na quantidade certa, no momento certo e no local certo, maximizando eficiência e minimizando desperdício.</p>
                
                <h4>Tecnologias principais</h4>
                <ul>
                    <li><strong>Gotejamento:</strong> Fornece água diretamente na raiz da planta, reduzindo evaporação</li>
                    <li><strong>Sensores de umidade:</strong> Monitoram o solo em tempo real para irrigar apenas quando necessário</li>
                    <li><strong>Estações meteorológicas:</strong> Preveem chuva e ajustam automaticamente a irrigação</li>
                    <li><strong>Sistemas automatizados:</strong> Controlados por IoT (Internet das Coisas)</li>
                </ul>
                
                <h4>Impacto ambiental</h4>
                <p>Pode reduzir o consumo de água em até 60% comparado a sistemas tradicionais, preservando recursos hídricos cada vez mais escassos.</p>
                
                <h4>Benefícios econômicos</h4>
                <p>Além da economia de água, reduz custos com energia e mão de obra, aumentando a produtividade por unidade de água utilizada.</p>
            `
        }
    };

    window.abrirModal = function(tipo) {
        const modal = document.getElementById('modal');
        const modalBody = document.getElementById('modal-body');
        const data = modalContent[tipo];

        if (!data) return;

        modalBody.innerHTML = `
            <h2 id="modal-title">${data.title}</h2>
            ${data.content}
        `;

        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Foco no botão de fechar para acessibilidade
        setTimeout(() => {
            const closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) closeBtn.focus();
        }, 100);
    };

    window.fecharModal = function() {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    // Fechar modal ao clicar fora
    const modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                fecharModal();
            }
        });
    }

    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            fecharModal();
        }
    });
}

// ============ GRÁFICOS DINÂMICOS ============
function initCharts() {
    const ctx = document.getElementById('impactoChart');
    if (!ctx || typeof Chart === 'undefined') return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Uso de Agrotóxicos', 'Consumo de Água', 'Erosão do Solo', 'Emissões de CO₂'],
            datasets: [{
                label: 'Agricultura Convencional',
                data: [100, 100, 100, 100],
                backgroundColor: '#c17b5c',
                borderRadius: 4
            }, {
                label: 'Agricultura Sustentável',
                data: [55, 40, 30, 45],
                backgroundColor: '#6b7a3a',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: { 
                            family: 'Inter', 
                            size: 12,
                            weight: '500'
                        },
                        color: '#1f1a15',
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: '#1f1a15',
                    titleFont: { family: 'Inter', size: 14 },
                    bodyFont: { family: 'Inter', size: 12 },
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y}% do impacto convencional`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(31, 26, 21, 0.1)'
                    },
                    ticks: {
                        font: { family: 'Inter', size: 11 },
                        color: '#1f1a15',
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Impacto relativo (%)',
                        font: { family: 'Inter', size: 12, weight: '600' },
                        color: '#1f1a15'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: { family: 'Inter', size: 11 },
                        color: '#1f1a15'
                    }
                }
            }
        }
    });
}

// ============ INICIALIZAÇÃO ============
document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMobileMenu();
    initSmoothScroll();
    initTimelineAnimations();
    initCounters();
    initContactForm();
    initQuiz();
    initModals();
    initCharts();

    // Animação de entrada suave
    document.body.classList.add('loaded');
});

// ============ LAZY LOADING PARA GRÁFICOS ============
if (typeof IntersectionObserver !== 'undefined') {
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chartId = entry.target.id;
                if (chartId === 'impactoChart' && typeof Chart !== 'undefined') {
                    // Gráfico já inicializado
                }
                chartObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const chartContainer = document.getElementById('chart-container');
    if (chartContainer) {
        chartObserver.observe(chartContainer);
    }
}

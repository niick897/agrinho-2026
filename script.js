/* Reset e Variáveis */
:root {
    --primary-color: #2d6a4f;
    --secondary-color: #52b788;
    --accent-color: #74c69d;
    --dark-color: #1b4332;
    --light-color: #d8f3dc;
    --white: #ffffff;
    --gray: #6c757d;
    --light-gray: #f8f9fa;
    --gradient: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    --shadow: 0 5px 15px rgba(0,0,0,0.1);
    --shadow-hover: 0 10px 30px rgba(0,0,0,0.2);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Poppins', sans-serif;
    line-height: 1.6;
    color: #333;
    overflow-x: hidden;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Navegação */
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    background: var(--white);
    box-shadow: var(--shadow);
    z-index: 1000;
    transition: all 0.3s ease;
}

.navbar.scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: var(--shadow-hover);
}

.navbar .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 20px;
}

.logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color);
}

.logo i {
    font-size: 2rem;
    color: var(--secondary-color);
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-link {
    text-decoration: none;
    color: var(--dark-color);
    font-weight: 600;
    transition: color 0.3s ease;
    position: relative;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--secondary-color);
    transition: width 0.3s ease;
}

.nav-link:hover::after {
    width: 100%;
}

.nav-link:hover {
    color: var(--primary-color);
}

.hamburger {
    display: none;
    flex-direction: column;
    cursor: pointer;
    gap: 5px;
}

.bar {
    width: 25px;
    height: 3px;
    background: var(--primary-color);
    transition: all 0.3s ease;
}

/* Hero Section */
.hero {
    height: 100vh;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><rect fill="%232d6a4f" width="1200" height="600"/><path fill="%2352b788" d="M0 300c200-50 400-50 600 0s400 50 600 0v300H0z" opacity="0.3"/></svg>') no-repeat center center/cover;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
}

.hero-content {
    position: relative;
    z-index: 1;
    color: var(--white);
    max-width: 800px;
    padding: 2rem;
}

.hero h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    animation: fadeInUp 1s ease;
}

.hero p {
    font-size: 1.3rem;
    margin-bottom: 2rem;
    animation: fadeInUp 1s ease 0.2s backwards;
}

.hero-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    animation: fadeInUp 1s ease 0.4s backwards;
}

/* Botões */
.btn {
    padding: 1rem 2rem;
    border: none;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.btn-primary {
    background: var(--gradient);
    color: var(--white);
    box-shadow: var(--shadow);
}

.btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-hover);
}

.btn-secondary {
    background: var(--white);
    color: var(--primary-color);
    border: 2px solid var(--white);
}

.btn-secondary:hover {
    background: transparent;
    color: var(--white);
}

.btn-calc {
    background: var(--gradient);
    color: var(--white);
    width: 100%;
    padding: 1.2rem;
    font-size: 1.1rem;
}

/* Seções */
.section {
    padding: 5rem 0;
}

.section-title {
    text-align: center;
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
    position: relative;
}

.section-title::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: var(--gradient);
    margin: 1rem auto;
    border-radius: 2px;
}

.section-subtitle {
    text-align: center;
    color: var(--gray);
    font-size: 1.1rem;
    margin-bottom: 3rem;
}

/* Sobre Section */
.sobre {
    background: var(--light-gray);
}

.sobre-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
    margin-top: 3rem;
}

.sobre-text p {
    margin-bottom: 1rem;
    text-align: justify;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 2rem;
}

.stat-card {
    background: var(--white);
    padding: 2rem;
    border-radius: 15px;
    text-align: center;
    box-shadow: var(--shadow);
    transition: transform 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-10px);
}

.stat-card i {
    font-size: 2.5rem;
    color: var(--secondary-color);
    margin-bottom: 1rem;
}

.stat-number {
    font-size: 3rem;
    font-weight: 700;
    color: var(--primary-color);
}

.stat-card p {
    color: var(--gray);
    margin: 0;
}

.sobre-image .image-placeholder {
    background: var(--gradient);
    height: 400px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-hover);
}

.sobre-image i {
    font-size: 8rem;
    color: var(--white);
    opacity: 0.8;
}

/* Práticas Section */
.praticas {
    background: var(--white);
}

.praticas-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.pratica-card {
    background: var(--white);
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: var(--shadow);
    transition: all 0.3s ease;
    border: 2px solid transparent;
}

.pratica-card:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-hover);
    border-color: var(--secondary-color);
}

.pratica-icon {
    width: 70px;
    height: 70px;
    background: var(--gradient);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
}

.pratica-icon i {
    font-size: 2rem;
    color: var(--white);
}

.pratica-card h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
    font-size: 1.5rem;
}

.pratica-card p {
    color: var(--gray);
    margin-bottom: 1.5rem;
}

.pratica-benefits {
    list-style: none;
}

.pratica-benefits li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    color: var(--dark-color);
}

.pratica-benefits i {
    color: var(--secondary-color);
}

/* Tecnologias Section */
.tecnologias {
    background: var(--light-gray);
}

.tech-container {
    max-width: 900px;
    margin: 0 auto;
    background: var(--white);
    border-radius: 20px;
    padding: 3rem;
    box-shadow: var(--shadow);
}

.tech-slider {
    position: relative;
    overflow: hidden;
}

.tech-card {
    display: none;
    text-align: center;
    animation: fadeIn 0.5s ease;
}

.tech-card.active {
    display: block;
}

.tech-card i {
    font-size: 5rem;
    color: var(--secondary-color);
    margin-bottom: 1.5rem;
}

.tech-card h3 {
    color: var(--primary-color);
    font-size: 2rem;
    margin-bottom: 1rem;
}

.tech-card p {
    color: var(--gray);
    margin-bottom: 2rem;
    font-size: 1.1rem;
}

.tech-stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
}

.tech-stat {
    text-align: center;
}

.stat-value {
    display: block;
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--primary-color);
}

.stat-label {
    color: var(--gray);
    font-size: 0.9rem;
}

.tech-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-top: 2rem;
}

.tech-btn {
    background: var(--gradient);
    color: var(--white);
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1.2rem;
}

.tech-btn:hover {
    transform: scale(1.1);
}

.tech-dots {
    display: flex;
    gap: 0.5rem;
}

.dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--gray);
    cursor: pointer;
    transition: all 0.3s ease;
}

.dot.active {
    background: var(--primary-color);
    width: 30px;
    border-radius: 6px;
}

/* Calculadora Section */
.calculadora {
    background: var(--gradient);
    color: var(--white);
}

.calculadora .section-title,
.calculadora .section-subtitle {
    color: var(--white);
}

.calc-container {
    max-width: 1000px;
    margin: 0 auto;
    background: var(--white);
    border-radius: 20px;
    padding: 3rem;
    box-shadow: var(--shadow-hover);
}

.calc-form {
    display: grid;
    gap: 1.5rem;
}

.form-group label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--dark-color);
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.form-group input[type="number"] {
    width: 100%;
    padding: 1rem;
    border: 2px solid var(--light-gray);
    border-radius: 10px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.form-group input[type="number"]:focus {
    outline: none;
    border-color: var(--secondary-color);
}

.checkbox-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.checkbox-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer

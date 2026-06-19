// AGRINHO 2026 - Script Principal

document.addEventListener("DOMContentLoaded", () => {
    console.log("Site AGRINHO 2026 carregado com sucesso!");

    // Animação ao clicar em botões
    const botoes = document.querySelectorAll("button");

    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            alert("Obrigado por visitar o projeto AGRINHO 2026!");
        });
    });

    // Validação de formulário
    const formulario = document.querySelector("form");

    if (formulario) {
        formulario.addEventListener("submit", (evento) => {
            const nome = document.querySelector("#nome");

            if (nome && nome.value.trim() === "") {
                evento.preventDefault();
                alert("Por favor, preencha o campo Nome.");
            }
        });
    }

    // Efeito de destaque em elementos
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "scale(1.05)";
            card.style.transition = "0.3s";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "scale(1)";
        });
    });
});<script src="script.js"></script>

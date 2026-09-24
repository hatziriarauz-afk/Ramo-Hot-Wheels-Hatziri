const messages = [
  "Eres una persona muy especial para mí. 💙",
  "Gracias por estar en mi vida. 🏎️",
  "Hice este detalle especialmente para ti. ✨",
  "Contigo todos mis días son más bonitos. 💫",
  "Te quiero mucho, Sergio. 💙"
];

const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const page = document.getElementById("page");
const modal = document.getElementById("modal");
const message = document.getElementById("message");
const closeModal = document.getElementById("close-modal");

startButton.addEventListener("click", () => {
  startScreen.style.display = "none";
  page.hidden = false;
  document.body.classList.remove("not-loaded");

  createParticles();
});

document.querySelectorAll(".flower").forEach((flower) => {
  flower.addEventListener("click", () => {
    const index = Number(flower.dataset.index);
    message.textContent = messages[index];
    modal.classList.add("active");
  });
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("active");
  }
});

function createParticles() {
  setInterval(() => {
    const particle = document.createElement("span");

    particle.className = "particle";
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.animationDuration = `${2 + Math.random() * 2}s`;

    document.querySelector(".particles").appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 4000);
  }, 350);
}

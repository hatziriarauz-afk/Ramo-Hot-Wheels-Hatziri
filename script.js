/* ============================================================
   PROYECTO: Feliz 30 de septiembre
   AUTOR: Hatziri Joely López Arauz
   DESCRIPCIÓN: Lógica de la postal interactiva
   ============================================================ */

'use strict';

/* ------------------------------------------------------------
   1. DATOS ESTÁTICOS
   ------------------------------------------------------------ */

/** Mensajes personalizados para cada flor */
const messages = [
  'Te quiero mucho sergio de mi corazón.',
  'Sos una persona especial.',
  'Gracias por soportarme.',
  'Gracias por ser mi alguien importante en mi vida.Te quiero mucho sapo.',
  'Gracias por formar parte de mi vida.'
];

/** Imágenes de autos Hot Wheels */
const carImages = [
  'https://i.pinimg.com/736x/48/73/32/4873329538169dc4a690e0325b1c87a0.jpg',
  'https://i.pinimg.com/736x/79/ec/ac/79ecac74713a50d35d39a1d94245ed99.jpg',
  'https://i.pinimg.com/736x/7b/d2/0c/7bd20c24c575ecfa621727b59c50881d.jpg',
  'https://i.pinimg.com/736x/2f/a2/40/2fa24003df141ce44c1faebed7657b51.jpg',
  'https://i.pinimg.com/736x/52/0e/a0/520ea07326484c50977b05b4442712f5.jpg'
];


/* ------------------------------------------------------------
   2. REFERENCIAS AL DOM
   ------------------------------------------------------------ */
const startScreen  = document.getElementById('start-screen');
const startButton  = document.getElementById('start-button');
const app          = document.getElementById('app');
const music        = document.getElementById('music');
const modal        = document.getElementById('modal');
const modalImage   = document.getElementById('modal-image');
const modalMessage = document.getElementById('modal-message');
const closeModal   = document.getElementById('close-modal');
const particlesBox = document.getElementById('particles');
const shootingBox  = document.getElementById('shootingStars');
const flowers      = document.querySelectorAll('.flower');


/* ------------------------------------------------------------
   3. INICIALIZACIÓN
   ------------------------------------------------------------ */

/**
 * Asigna la imagen correspondiente a cada flor
 * según su índice en el arreglo carImages.
 */
function initFlowers() {
  flowers.forEach((flower, i) => {
    const img = flower.querySelector('.car');
    if (img) img.src = carImages[i];
  });
}

/**
 * Inicia la experiencia: oculta pantalla de inicio,
 * muestra app, activa música y arranca efectos.
 */
function startExperience() {
  startScreen.style.transition = 'opacity .6s ease';
  startScreen.style.opacity = '0';

  setTimeout(() => {
    startScreen.style.display = 'none';
    app.classList.remove('hidden');

    // Reproducir música (requiere interacción del usuario)
    music.volume = 0.35;
    music.play().catch(() => {
      console.warn('El navegador bloqueó el audio automático.');
    });

    // Efectos ambientales
    setInterval(makeParticle, 380);
    setInterval(makeShootingStar, 4500);

    // Aparición en cascada de las flores
    animateFlowersEntrance();
  }, 600);
}

/**
 * Anima la entrada de cada flor con retardo progresivo.
 */
function animateFlowersEntrance() {
  flowers.forEach((f, i) => {
    f.style.opacity = '0';
    f.style.transform += ' translateY(40px) scale(.8)';

    setTimeout(() => {
      f.style.transition = 'opacity .8s ease, transform .8s cubic-bezier(.2, .9, .3, 1.4)';
      f.style.opacity = '1';
      f.style.transform = f.style.transform.replace(' translateY(40px) scale(.8)', '');
    }, 150 * i);
  });
}


/* ------------------------------------------------------------
   4. EVENTOS
   ------------------------------------------------------------ */

// 4.1 Iniciar experiencia
startButton.addEventListener('click', startExperience);

// 4.2 Abrir modal al hacer clic en una flor
flowers.forEach(flower => {
  flower.addEventListener('click', () => {
    const i = Number(flower.dataset.index);
    modalImage.src = carImages[i];
    modalMessage.textContent = messages[i];
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    burstParticles();
  });
});

// 4.3 Cerrar modal
closeModal.addEventListener('click', closeTheModal);
modal.addEventListener('click', e => {
  if (e.target === modal) closeTheModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeTheModal();
});

/**
 * Cierra el modal con una pequeña animación.
 */
function closeTheModal() {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  setTimeout(() => { modalImage.src = ''; }, 300);
}


/* ------------------------------------------------------------
   5. EFECTOS VISUALES
   ------------------------------------------------------------ */

/**
 * Genera una partícula flotante desde la parte inferior.
 */
function makeParticle() {
  const p = document.createElement('span');
  p.className = 'particle';
  p.style.left = `${Math.random() * 100}vw`;
  p.style.setProperty('--x', `${(Math.random() - .5) * 35}vw`);
  p.style.animationDuration = `${2.5 + Math.random() * 2.5}s`;

  const colors = ['#ffffff', '#bcd4ff', '#ffd6ec', '#d9b8ff', '#fff8b0'];
  p.style.background = colors[Math.floor(Math.random() * colors.length)];
  p.style.boxShadow = `0 0 12px ${p.style.background}`;

  particlesBox.appendChild(p);
  setTimeout(() => p.remove(), 5000);
}

/**
 * Genera una estrella fugaz en una posición aleatoria.
 */
function makeShootingStar() {
  const s = document.createElement('div');
  s.className = 'shooting-star';
  s.style.left = `${Math.random() * 60}vw`;
  s.style.top  = `${Math.random() * 30}vh`;
  s.style.animationDuration = `${1.5 + Math.random() * 1.5}s`;
  shootingBox.appendChild(s);
  setTimeout(() => s.remove(), 3500);
}

/**
 * Explosión de partículas desde el centro de la pantalla.
 * Se usa al abrir el modal.
 */
function burstParticles() {
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  const colors = ['#ffffff', '#bcd4ff', '#ffd6ec', '#d9b8ff', '#fff8b0'];

  for (let i = 0; i < 30; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    p.style.left = `${cx}px`;
    p.style.top  = `${cy}px`;
    p.style.bottom = 'auto';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.boxShadow = `0 0 14px ${p.style.background}`;

    const angle = Math.random() * Math.PI * 2;
    const dist  = 100 + Math.random() * 220;
    p.style.setProperty('--x', `${Math.cos(angle) * dist}px`);
    p.style.setProperty('--y', `${Math.sin(angle) * dist}px`);
    p.style.animation = 'explode 1s ease-out forwards';

    particlesBox.appendChild(p);
    setTimeout(() => p.remove(), 1200);
  }
}


/* ------------------------------------------------------------
   6. ANIMACIÓN DINÁMICA (keyframe de explosión)
   ------------------------------------------------------------ */
(function injectExplodeKeyframe() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes explode {
      to {
        translate: var(--x) var(--y);
        opacity: 0;
        scale: .2;
      }
    }
  `;
  document.head.appendChild(style);
})();


/* ------------------------------------------------------------
   7. PUNTO DE ENTRADA
   ------------------------------------------------------------ */
(function init() {
  initFlowers();
  console.log('%c💙 Postal cargada correctamente', 'color:#8bbcff; font-weight:bold;');
})();

const messages=[
  'Te quiero mucho sergio de mi corazón.',
  'Sos una persona especial.',
  'Gracias por soportarme.',
  'Gracias por ser mi alguien importante en mi vida.Te quiero mucho sapo.',
  'Gracias por formar parte de mi vida.'
];

const carImages=[
  'https://i.pinimg.com/736x/48/73/32/4873329538169dc4a690e0325b1c87a0.jpg',
  'https://i.pinimg.com/736x/79/ec/ac/79ecac74713a50d35d39a1d94245ed99.jpg',
  'https://i.pinimg.com/736x/7b/d2/0c/7bd20c24c575ecfa621727b59c50881d.jpg',
  'https://i.pinimg.com/736x/2f/a2/40/2fa24003df141ce44c1faebed7657b51.jpg',
  'https://i.pinimg.com/736x/52/0e/a0/520ea07326484c50977b05b4442712f5.jpg'
];
document.querySelectorAll('.flower').forEach((flower, index) => {
  const image = flower.querySelector('.flower-car');

  if (image) {
    image.src = carImages[index];
  }
});
const startScreen=document.getElementById('start-screen');
const startButton=document.getElementById('start-button');
const app=document.getElementById('app');
const music=document.getElementById('music');
const modal=document.getElementById('modal');
const modalImage=document.getElementById('modal-image');
const modalMessage=document.getElementById('modal-message');
const closeModal=document.getElementById('close-modal');

startButton.addEventListener('click',()=>{
  startScreen.style.display='none';
  app.classList.remove('hidden');
  music.volume=.35;
  music.play().catch(()=>{});
  createParticles();
});

document.querySelectorAll('.flower').forEach(flower=>{
  flower.addEventListener('click',()=>{
    const index=Number(flower.dataset.index);
    modalImage.src=carImages[index];
    modalMessage.textContent=messages[index];
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
  });
});

function closeTheModal(){
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden','true');
  modalImage.src='';
}

closeModal.addEventListener('click',closeTheModal);
modal.addEventListener('click',event=>{
  if(event.target===modal) closeTheModal();
});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape') closeTheModal();
});

function createParticles(){
  const container=document.getElementById('particles');
  setInterval(()=>{
    const particle=document.createElement('span');
    particle.className='particle';
    particle.style.left=`${Math.random()*100}vw`;
    particle.style.setProperty('--x',`${(Math.random()-.5)*24}vw`);
    particle.style.animationDuration=`${2.2+Math.random()*2}s`;
    container.appendChild(particle);
    setTimeout(()=>particle.remove(),4500);
  },380);
}

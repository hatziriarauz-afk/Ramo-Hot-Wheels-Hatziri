// CADA CARRITO TIENE SU PROPIA FRASE Y SU PROPIA FOTO
const cards = [
    {
        text: "Te quiero mucho sergio de mi corazón.",
        image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80"
    },
    {
        text: " Sos una persona especial.",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80"
    },
    {
        text: "Hice esto especialmente para vos .",
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80"
    },
    {
        text: "Gracias por soportarme .",
        image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=600&q=80"
    },
    {
        text: "Gracias por ser mi alguien importante en mi vida. ¡Te quiero mucho sapo!",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80"
    }
];

let currentIndex = 0;

// PANTALLA DE CARGA
window.addEventListener('DOMContentLoaded', () => {
    let progress = 0;
    const progressBar = document.getElementById('progress-bar');
    const carLoader = document.getElementById('car-loader');
    const progressText = document.getElementById('progress-text');
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');

    const interval = setInterval(() => {
        progress += 2;
        progressBar.style.width = `${progress}%`;
        carLoader.style.left = `${progress}%`;
        progressText.innerText = `${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('hidden');
                mainContent.classList.remove('hidden');
            }, 300);
        }
    }, 35);
});

// ABRIR EL CARRITO ESPECÍFICO QUE SE TOCÓ
function openCard(index) {
    currentIndex = index;
    updateCardView();
    document.getElementById('card-modal').classList.remove('hidden');
}

function closeCard() {
    document.getElementById('card-modal').classList.add('hidden');
}

function updateCardView() {
    const cardData = cards[currentIndex];
    document.getElementById('card-text').innerText = `"${cardData.text}"`;
    document.getElementById('card-img').src = cardData.image;
    document.getElementById('card-counter').innerText = `${currentIndex + 1} / ${cards.length}`;
}

function nextCard() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCardView();
}

function prevCard() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCardView();
}

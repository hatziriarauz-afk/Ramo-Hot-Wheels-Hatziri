document.getElementById('openBtn').addEventListener('click', function() {
    // Ocultar botón y título inicial
    this.style.display = 'none';
    document.getElementById('main-title').style.display = 'none';
    
    // Mostrar el ramo
    const bouquet = document.getElementById('bouquet');
    bouquet.classList.remove('hidden');
    
    // Efecto de aparición suave
    bouquet.style.animation = "fadeIn 1.5s ease-in-out";
});

function flipCard(card) {
    // Alterna la clase para voltear la tarjeta
    card.classList.toggle('flipped');
}

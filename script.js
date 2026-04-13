// --- Efecto de aparición (Reveal) al hacer scroll ---
const observerOptions = {
    threshold: 0.15 // El elemento debe estar al 15% visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Seleccionar todos los elementos que tienen el atributo data-reveal
// y también las tarjetas de fotos y la invitación
document.querySelectorAll('[data-reveal], .photo-card, .card-invitation').forEach(el => {
    observer.observe(el);
});

// --- Función de Confeti ---
function lanzarConfeti() {
    confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#001a4d', '#e63946', '#FFFFFF'] // Amarillo, Azul, Rojo, Blanco
    });
}
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
const audio = document.getElementById('bgMusic');
const icon = document.getElementById('music-icon');
let hasInteracted = false;

const startAudioWithDelay = () => {
    if (!hasInteracted) {
        hasInteracted = true;

        // TRUCO: Reproducimos en silencio total de inmediato
        // Esto le dice al navegador: "El usuario autorizó el audio"
        audio.volume = 0;
        audio.play().then(() => {
            console.log("Audio autorizado por el navegador. Esperando 3 segundos...");
            
            // Ahora esperamos los 3 segundos para que realmente se escuche
            setTimeout(() => {
                audio.pause();           // Pausamos un momento
                audio.currentTime = 0;   // Reiniciamos al principio de la canción
                audio.volume = 1;        // Subimos el volumen al máximo
                audio.play();            // Ahora sí suena para el usuario
                icon.innerText = '🔊';
                console.log("¡Música sonando ahora!");
            }, 1000); // 1000ms = 1 segundo
            
        }).catch(error => {
            console.log("Error al intentar autorizar audio:", error);
            hasInteracted = false; // Permitir reintentar si falló
        });
    }
};

// Escuchamos clics, toques o scroll
document.addEventListener('click', startAudioWithDelay);
document.addEventListener('touchstart', startAudioWithDelay);
document.addEventListener('scroll', startAudioWithDelay, { once: true });

// Función para el botón de silenciar manual
function toggleMusic() {
    if (audio.paused) {
        audio.play();
        icon.innerText = '🔊';
    } else {
        audio.pause();
        icon.innerText = '🔇';
    }
}
   // --- 1. Efecto de aparición al hacer scroll (Intersection Observer) ---
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Retrasar un poco la aparición para un efecto secuencial en la galería
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);
                }
            });
        }, { threshold: 0.15 });

        // Seleccionar elementos y aplicar retraso secuencial a las fotos
        document.querySelectorAll('[data-reveal]').forEach((el, index) => {
            if (el.classList.contains('photo-card')) {
                el.dataset.delay = index * 150; // 150ms de retraso entre cada foto
            }
            observer.observe(el);
        });

        // --- 2. Función de Confeti ---
        function lanzarConfeti() {
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.7 },
                colors: ['#FFD700', '#1A2A44', '#E63946', '#7FB069', '#FFFFFF']
            });
        }
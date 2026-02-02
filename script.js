document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('nav ul');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // Cursor Glow Effect
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply reveal to elements
    document.querySelectorAll('.skill-card, .project-slot, .section-title, .hero-content, .profile-frame').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s cubic-bezier(0.19, 1, 0.22, 1)";
        observer.observe(el);
    });

    // Digital Rain / Code Background
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, columns;
        const fontSize = 16;
        const drops = [];

        // Tech snippets and symbols
        const chars = ['<?php', 'luzDev', 'python', '=>', 'JS', 'Node', 'SQL', '{ }', '=>', 'const', 'function', '$', '0', '1', '()', '=>', '[]'];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            columns = Math.floor(width / fontSize);
            for (let i = 0; i < columns; i++) {
                drops[i] = Math.random() * -100;
            }
        }

        function draw() {
            ctx.fillStyle = 'rgba(5, 7, 10, 0.1)';
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = '#00f2ff'; // Primary color
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize * 3, drops[i] * fontSize);

                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        window.addEventListener('resize', resize);
        resize();
        setInterval(draw, 50);
    }
});

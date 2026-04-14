document.addEventListener('DOMContentLoaded', () => {

    // Set current year in footer
    const yearSpan = document.getElementById('year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.add('scrolled');
            // Wait, for premium feel we usually keep it slightly styled or transparent
            if (window.scrollY === 0) {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if(hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle hamburger animation
            const spans = hamburger.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'translateY(8px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // Simple Form Mock
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate an API call / form submission
            const name = document.getElementById('name').value;
            
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                formMessage.innerHTML = `<p style="color: var(--accent-gold); margin-top: 15px;">Thank you for your inquiry, ${name}. We will get back to you shortly!</p>`;
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
                
                // Clear message after 5 seconds
                setTimeout(() => {
                    formMessage.innerHTML = '';
                }, 5000);
            }, 1000);
        });
    }

    // Intersection Observer for Scroll Animations
    // (We could animate the product cards popping in as you scroll down)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) ${index * 0.1}s`;
        observer.observe(card);
    });
});

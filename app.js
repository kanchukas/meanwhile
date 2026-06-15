document.addEventListener('DOMContentLoaded', () => {

    // 1. Navigation Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    mobileToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
        // Toggle mobile menu icon shapes
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = mobileNav.classList.contains('open') ? 'rotate(45deg) translate(6px, 6px)' : 'none';
        spans[1].style.opacity = mobileNav.classList.contains('open') ? '0' : '1';
        spans[2].style.transform = mobileNav.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : 'none';
    });

    // Close mobile menu when clicking outside or on links
    document.addEventListener('click', (e) => {
        if (!mobileToggle.contains(e.target) && !mobileNav.contains(e.target) && mobileNav.classList.contains('open')) {
            mobileNav.classList.remove('open');
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // 3. Scroll Reveal / Entry Animations
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const revealTop = reveal.getBoundingClientRect().top;
            const revealPoint = 150; // trigger early

            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    };
    
    // Initial run and bind scroll listener
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // 4. Scroll Spy (Active Navigation Link Highlighting)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });



    // 6. Newsletter Subscription Handler
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input');
        const submitBtn = newsletterForm.querySelector('button');
        const originalText = submitBtn.textContent;
        
        // Simulating success interaction
        submitBtn.disabled = true;
        submitBtn.textContent = 'Joining...';
        
        setTimeout(() => {
            submitBtn.textContent = 'Welcome! 🎉';
            submitBtn.style.backgroundColor = '#10b981'; // Green accent
            submitBtn.style.color = '#fff';
            emailInput.value = '';
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.style.color = '';
            }, 3000);
        }, 1200);
    });
});

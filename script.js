document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

    if (currentTheme) {
        document.body.classList.remove('dark-theme', 'light-theme');
        document.body.classList.add(currentTheme);
        if (currentTheme === 'light-theme') {
            toggleSwitch.checked = true;
        }
    } else {
        // default is dark, checkbox is unchecked
        toggleSwitch.checked = false;
    }

    toggleSwitch.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
        } else {
            document.body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        }
    });

    // 2. XM Smart Link Logic
    const xmLinkBtn = document.getElementById('xm-smart-link');
    const deviceText = document.getElementById('device-detected-text');
    
    // Simple device detection
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobile = /android|ipad|iphone|ipod/i.test(userAgent.toLowerCase());

    if (xmLinkBtn && deviceText) {
        if (isMobile) {
            // Mobile platform detection logic
            xmLinkBtn.href = "https://www.xm.com/mobile"; // Mobile specific path or app link
            xmLinkBtn.innerHTML = '<i class="fas fa-mobile-alt"></i> Open XM App';
            deviceText.innerText = "Mobile device detected. Opening XM App.";
        } else {
            // Desktop platform logic
            xmLinkBtn.href = "https://www.xm.com/account/stats/akar"; // Example desktop path
            xmLinkBtn.innerHTML = '<i class="fas fa-desktop"></i> View on XM.com';
            deviceText.innerText = "Desktop detected. Opening XM Web Platform.";
        }
    }

    // 3. Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger initially on page load

    // 4. Navbar Background on Scroll & Hero Parallax
    const navbar = document.getElementById('navbar');
    const heroContent = document.querySelector('.hero-content');
    const heroBg = document.getElementById('hero-bg');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Navbar effect
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hero Parallax Fade Effect
        if (heroContent) {
            // Calculate opacity based on scroll (fades out completely by 800px)
            const opacity = Math.max(0, 1 - (scrollY / 800));
            // Calculate slight transform push down
            const translateY = scrollY * 0.3;
            
            heroContent.style.opacity = opacity;
            heroContent.style.transform = `translateY(${translateY}px)`;
            
            // Disable pointer events when invisible so it doesn't block clicks
            if (opacity <= 0) {
                heroContent.style.pointerEvents = 'none';
            } else {
                heroContent.style.pointerEvents = 'auto';
            }
        }

        // Hero Background Parallax
        if (heroBg) {
            // Move background down at a very slow speed for depth
            const bgTranslateY = scrollY * 0.4;
            heroBg.style.transform = `translateY(${bgTranslateY}px)`;
        }
    });

    // 5. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinksList = document.querySelector('.nav-links');

    if (hamburger && navLinksList) {
        hamburger.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
            hamburger.innerHTML = navLinksList.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Close menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksList.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
});

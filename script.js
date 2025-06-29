// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {

    // Select all necessary elements from the DOM
    const header = document.querySelector('.header');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const sections = document.querySelectorAll('section');
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    // --- Header Scroll Effect ---
    // Adds a shadow to the header when the user scrolls down
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // --- Mobile Navigation ---
    // Toggles the mobile navigation menu on hamburger click
    hamburger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Closes the mobile menu when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // --- Active Nav Link on Scroll ---
    // Highlights the current section's link in the navigation bar
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6 // 60% of the section must be visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If a section is intersecting the viewport
            if (entry.isIntersecting) {
                const navLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);

                // Remove 'active' class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add 'active' class to the corresponding nav link
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // Observe each section
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Animate Sections on Scroll ---
    // Fades in sections as they are scrolled into view
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing the section once it's visible
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the section is visible

    // Observe each section for the reveal effect
    sections.forEach(section => {
        revealObserver.observe(section);
    });

    // --- Simple Contact Form Handler ---
    // Provides a front-end confirmation message on form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent the default form submission

            // This is a front-end simulation. No email is actually sent.
            // For a real form, you would need a backend service (like EmailJS, Formspree, or your own server)
            formMessage.style.color = 'var(--accent-color)';
            formMessage.textContent = 'Thank you for your message! I will get back to you soon.';

            // Clear the form fields
            contactForm.reset();

            // Remove the message after 5 seconds
            setTimeout(() => {
                formMessage.textContent = '';
            }, 5000);
        });
    }
});

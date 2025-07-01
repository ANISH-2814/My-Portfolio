// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {

    // --- All your existing code for header, nav, scroll effects, etc. ---
    const header = document.querySelector('.header');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    hamburger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.6 };
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const navLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) { navLink.classList.add('active'); }
            }
        });
    }, observerOptions);
    sections.forEach(section => { sectionObserver.observe(section); });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(section => { revealObserver.observe(section); });
    // --- End of existing code ---


    // --- NEW EMAILJS CONTACT FORM LOGIC ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const sendButton = contactForm.querySelector('button');

    // Initialize EmailJS with your Public Key
    // Make sure the EmailJS SDK script is in your HTML file before this script
    (function () {
        // Replace 'YOUR_PUBLIC_KEY' with your actual Public Key from your EmailJS account
        emailjs.init({
            publicKey: "JOshw62Y2bHUYaCnj",
        });
    })();

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent the default form submission

            // Change button text to show it's working
            sendButton.textContent = 'Sending...';
            sendButton.disabled = true; // Disable button to prevent multiple clicks
            formMessage.textContent = '';

            // --- These are your specific IDs from your EmailJS account ---
            // Replace with your own IDs after you create your EmailJS account
            const serviceID = 'service_x0dlrw4';
            const templateID = 'template_586t9ko';

            // Send the email using EmailJS
            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    // Success!
                    sendButton.textContent = 'Send Message';
                    sendButton.disabled = false;
                    formMessage.style.color = 'var(--accent-color)';
                    formMessage.textContent = 'Message sent successfully! Thank you.';
                    contactForm.reset();

                    // Hide the success message after 5 seconds
                    setTimeout(() => {
                        formMessage.textContent = '';
                    }, 5000);

                }, (err) => {
                    // Failure!
                    sendButton.textContent = 'Send Message';
                    sendButton.disabled = false;
                    formMessage.style.color = '#ff4d4d'; // A red color for errors
                    formMessage.textContent = 'Failed to send message. Please try again later.';
                    console.error('EmailJS Error:', JSON.stringify(err));
                });
        });
    }
});

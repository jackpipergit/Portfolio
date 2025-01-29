// grabbed this from stackoverflow because i cbf writing it myself
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    // main typing function - looks complicated but its just math
    type() {
        // grab the current word based on the array index
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        // check if we're deleting or typing
        if(this.isDeleting) {
            // remove a char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // add a char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // slam the new text into the element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // base typing speed
        let typeSpeed = 100;

        if(this.isDeleting) {
            // make deleting twice as fast
            typeSpeed /= 2;
        }

        // if word is complete
        if(!this.isDeleting && this.txt === fullTxt) {
            // pause at end
            typeSpeed = this.wait;
            // set delete to true
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // move to next word
            this.wordIndex++;
            // pause before typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Wait for DOM to load, then initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typewriter
    const txtElement = document.getElementById('typewriter');
    const words = [
        'Crafting robust digital solutions with modern technologies',
        'Building enterprise solutions that drive business growth',
        'Developing scalable applications with cutting-edge tech'
    ];
    const wait = 2000;
    new TypeWriter(txtElement, words, wait);

    // Navigation and scroll handling
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero');

    function updateNav() {
        const scrollY = window.scrollY;
        const heroHeight = heroSection.offsetHeight - 100;

        // Handle navbar background
        if (scrollY > heroHeight) {
            navbar.classList.add('light-bg');
        } else {
            navbar.classList.remove('light-bg');
        }

        // Handle active nav items
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Scroll animations
    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
            }
        });
    }

    // Event listeners
    window.addEventListener('scroll', () => {
        updateNav();
        checkScroll();
    });

    // Initial run
    updateNav();
    checkScroll();

    // Back to top functionality
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        if (window.scrollY > heroBottom) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Modal functionality
    const contactPill = document.querySelector('.contact-pill');
    const modal = document.querySelector('.modal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }

    contactPill.addEventListener('click', openModal);
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Form handling
    const form = document.getElementById('contactForm');

    // Remove HTML5 validation to use custom validation
    form.querySelectorAll('input, textarea').forEach(field => {
        field.removeAttribute('required');
    });

    function validateField(field) {
        const formGroup = field.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        
        if (!field.value.trim()) {
            formGroup.classList.add('error');
            errorMessage.textContent = `${field.placeholder} is required`;
            return false;
        }

        if (field.type === 'email' && !isValidEmail(field.value)) {
            formGroup.classList.add('error');
            errorMessage.textContent = 'Please enter a valid email address';
            return false;
        }

        formGroup.classList.remove('error');
        errorMessage.textContent = '';
        return true;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Clear errors when user types
    form.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('input', () => {
            const formGroup = field.parentElement;
            formGroup.classList.remove('error');
            formGroup.querySelector('.error-message').textContent = '';
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Always prevent default first
        
        // Validate all fields
        const fields = form.querySelectorAll('input, textarea');
        let isValid = true;
        
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (isValid) {
            // If validation passes, submit the form
            form.submit();
            // Close modal after short delay
            setTimeout(() => {
                closeModal();
            }, 100);
        }
    });
});

// Create the Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            // Once the animation is triggered, we can stop observing this element
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    
    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // When section is 25% visible
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
            }
        });
    }

    // Run on scroll
    window.addEventListener('scroll', checkScroll);
    // Run once on page load
    checkScroll();
});

// Brand Ticker
function setupTicker() {
    const wrapper = document.querySelector('.ticker-wrapper');
    if (!wrapper) return;

    // Clone the ticker items to create a seamless loop
    const clone = wrapper.cloneNode(true);
    wrapper.parentElement.appendChild(clone);

    // Pause animation on hover
    const ticker = document.querySelector('.brand-ticker');
    ticker.addEventListener('mouseenter', () => {
        document.querySelectorAll('.ticker-wrapper').forEach(wrap => {
            wrap.style.animationPlayState = 'paused';
        });
    });

    ticker.addEventListener('mouseleave', () => {
        document.querySelectorAll('.ticker-wrapper').forEach(wrap => {
            wrap.style.animationPlayState = 'running';
        });
    });
}

// Call the setup function when the page loads
document.addEventListener('DOMContentLoaded', setupTicker); 
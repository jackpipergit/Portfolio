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
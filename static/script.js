// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Gallery Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Keep navbar consistently black
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.style.background = 'rgba(0, 0, 0, 0.98)';
});

// Contact form submission with database integration
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject') || '',
            message: formData.get('message')
        };
        
        // Basic validation
        if (!data.name || !data.email || !data.message) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        try {
            // Submit to database
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
                this.reset();
            } else {
                showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
        }
    });
}

// Function to show form messages
function showMessage(message, type) {
    const messageDiv = document.getElementById('form-message');
    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Gallery item hover effects for better mobile experience
galleryItems.forEach(item => {
    item.addEventListener('touchstart', function() {
        this.classList.add('touch-active');
    });
    
    item.addEventListener('touchend', function() {
        setTimeout(() => {
            this.classList.remove('touch-active');
        }, 2000);
    });
});

// Add touch-active styles for mobile
const style = document.createElement('style');
style.textContent = `
    .gallery-item.touch-active .gallery-overlay {
        transform: translateY(0);
    }
    
    .gallery-item.touch-active img {
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);

// Preload critical images
const criticalImages = [
    'https://pixabay.com/get/g3b3228653ed739c27470b08a33a67ca5fcdd1feb404c9483042a98d4359546b5bed9cc6bb926a0c36e49d1fb76422019022420eb228bbc5f8b83a03621f940a2_1280.jpg'
];

criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
});

// Add loading state management
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Show sections with staggered animation
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

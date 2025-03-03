// Initialize Lucide icons
lucide.createIcons();

// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
const contactForm = document.getElementById('contactForm');
const currentYearEl = document.getElementById('currentYear');

// Set current year in footer
currentYearEl.textContent = new Date().getFullYear();

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
  mobileMenuBtn.classList.toggle('active');
  mobileNav.classList.toggle('active');
});

// Smooth scrolling and active section highlighting
let activeSection = 'home';
const sections = ['home', 'experience', 'projects', 'contact'];

// Function to scroll to section
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    // Close mobile menu if open
    mobileMenuBtn.classList.remove('active');
    mobileNav.classList.remove('active');
    
    // Scroll to section
    const headerHeight = document.querySelector('.header').offsetHeight;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    // Update active section
    updateActiveSection(sectionId);
  }
}

// Function to update active section
function updateActiveSection(sectionId) {
  activeSection = sectionId;
  
  // Update nav links
  navLinks.forEach(link => {
    if (link.dataset.section === sectionId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Add click event to nav links
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    scrollToSection(link.dataset.section);
  });
});

// Detect active section on scroll
window.addEventListener('scroll', () => {
  let currentSection = '';
  const scrollPosition = window.scrollY;
  
  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = sectionId;
      }
    }
  });
  
  if (currentSection !== '' && currentSection !== activeSection) {
    updateActiveSection(currentSection);
  }
});

// Handle contact form submission
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to a server
    // For now, we'll just log it to the console
    console.log('Form submitted:', { name, email, message });
    
    // Show success message (in a real app, you'd wait for server response)
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
  });
}

// Initialize the page with the correct active section
document.addEventListener('DOMContentLoaded', () => {
  // Check if URL has a hash
  const hash = window.location.hash.substring(1);
  if (hash && sections.includes(hash)) {
    scrollToSection(hash);
  } else {
    updateActiveSection('home');
  }
});
// Remove the loader after a fixed time
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        var loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(function() {
                if (loader) {
                    loader.style.display = 'none';
                }
            }, 800);
        }
    }, 2500);
});

// Header scroll effect
window.addEventListener('scroll', function() {
    var header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Mobile menu toggle
var navToggle = document.getElementById('nav-toggle');
if (navToggle) {
    navToggle.addEventListener('click', function() {
        var mainNav = document.getElementById('main-nav');
        var icon = this.querySelector('i');
        
        if (mainNav && icon) {
            mainNav.classList.toggle('active');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        var targetId = this.getAttribute('href');
        var targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            var mainNav = document.getElementById('main-nav');
            var navToggle = document.getElementById('nav-toggle');
            if (mainNav && mainNav.classList.contains('active') && navToggle) {
                mainNav.classList.remove('active');
                var icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        }
    });
});

// FAQ accordion
document.addEventListener('DOMContentLoaded', function() {
    var faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(function(item) {
        var question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(function(otherItem) {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    var contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var submitBtn = this.querySelector('button[type="submit"]');
            var originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(function() {
                var formSuccess = document.createElement('div');
                formSuccess.className = 'form-success';
                formSuccess.innerHTML = '<i class="fas fa-check-circle"></i><h3>Mensagem Enviada!</h3><p>Agradecemos seu contato. Nossa equipe retornará em breve.</p>';
                
                contactForm.innerHTML = '';
                contactForm.appendChild(formSuccess);
            }, 2000);
        });
    }
});
// Esperar que o DOM seja completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Remover preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        setTimeout(function() {
            preloader.classList.add('hidden');
        }, 500);
    });

    // Toggle menu móvel
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }

    // Active link ao scrollar
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function scrollActive() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-link[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.nav-link[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', scrollActive);

    // Header de fundo ao scrollar
    function scrollHeader() {
        const header = document.getElementById('header');
        if (this.scrollY >= 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', scrollHeader);

    // Botão de voltar ao topo
    function scrollTop() {
        const backToTopButton = document.getElementById('backToTop');
        if (this.scrollY >= 560) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', scrollTop);

    // Contador para estatísticas
    const stats = document.querySelectorAll('.stat-value');
    
    function runCounter() {
        stats.forEach(stat => {
            const targetCount = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 segundos
            const frameRate = 30; // 30 frames por segundo
            const totalFrames = duration / 1000 * frameRate;
            const increment = targetCount / totalFrames;
            
            let currentCount = 0;
            
            const counter = setInterval(() => {
                currentCount += increment;
                
                if (currentCount >= targetCount) {
                    stat.textContent = targetCount;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(currentCount);
                }
            }, 1000 / frameRate);
        });
    }

    // Contador regressivo
    function startCountdown() {
        const countdownEl = document.getElementById('countdown');
        if (!countdownEl) return;
        
        let time = 20 * 60; // 20 minutos em segundos
        
        // Verificar se já existe um tempo salvo no localStorage
        const savedTime = localStorage.getItem('countdownTime');
        const timestamp = localStorage.getItem('countdownTimestamp');
        
        if (savedTime && timestamp) {
            const elapsed = Math.floor((Date.now() - parseInt(timestamp)) / 1000);
            time = Math.max(0, parseInt(savedTime) - elapsed);
        }
        
        const countdownInterval = setInterval(function() {
            if (time <= 0) {
                clearInterval(countdownInterval);
                countdownEl.textContent = "Expirado";
                return;
            }
            
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            
            countdownEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            time--;
            
            // Salvar tempo atual no localStorage
            localStorage.setItem('countdownTime', time);
            localStorage.setItem('countdownTimestamp', Date.now());
        }, 1000);
    }
    
    startCountdown();

    // Formulário de contato
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envio do formulário (aqui você adicionaria o código real para enviar o formulário)
            setTimeout(function() {
                successMessage.style.display = 'block';
                contactForm.reset();
                
                // Esconder mensagem após 5 segundos
                setTimeout(function() {
                    successMessage.style.display = 'none';
                }, 5000);
            }, 1000);
        });
    }

    // Animação de entrada ao scrollar com Intersection Observer
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Se é um contador, inicie-o quando visível
                if (entry.target.querySelector('.stat-value')) {
                    runCounter();
                }
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // Links suaves
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Fechar menu móvel se aberto
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Exibir popup após 30 segundos (somente uma vez por sessão)
    function showPopupAfterDelay() {
        const hasShownPopup = sessionStorage.getItem('popupShown');
        
        if (!hasShownPopup) {
            setTimeout(() => {
                // Código para exibir popup
                // Aqui seria implementado caso a página tivesse um popup
                sessionStorage.setItem('popupShown', 'true');
            }, 30000); // 30 segundos
        }
    }
    
    showPopupAfterDelay();

    // Detector de saída para exibir popup de saída
    function setupExitIntent() {
        const hasShownExitPopup = sessionStorage.getItem('exitPopupShown');
        
        if (!hasShownExitPopup) {
            document.addEventListener('mouseleave', function(e) {
                // Se o mouse sair pela parte superior da página
                if (e.clientY < 0) {
                    // Código para exibir popup de saída
                    // Aqui seria implementado caso a página tivesse um popup de saída
                    sessionStorage.setItem('exitPopupShown', 'true');
                }
            });
        }
    }
    
    setupExitIntent();
});
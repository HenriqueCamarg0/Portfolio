document.addEventListener('DOMContentLoaded', function() {
  
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

  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
      navbar.style.background = 'rgba(26, 26, 26, 0.95)';
    }
  });

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

  const elementsToAnimate = document.querySelectorAll(
    '.service-card, .project-card, .contact-card, .tech-icon'
  );
  
  elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });

  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }

  let scrollElements = document.querySelectorAll('.tech-icon, .service-card, .project-card');
  
  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= 
      (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add('scrolled');
  };

  const hideScrollElement = (element) => {
    element.classList.remove('scrolled');
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.25)) {
        displayScrollElement(el);
      } else {
        hideScrollElement(el);
      }
    });
  };

  // Adicionar listener para scroll
  window.addEventListener('scroll', handleScrollAnimation);

  // Função para destacar seção ativa na navegação
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function highlightActiveSection() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionHeight = section.offsetHeight;
      
      if (sectionTop <= 150 && sectionTop + sectionHeight > 150) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // Listener para destacar seção ativa
  window.addEventListener('scroll', highlightActiveSection);
});
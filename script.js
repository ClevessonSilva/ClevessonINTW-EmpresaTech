document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            resetErrors(this);

            let isValid = true;

            const name = document.getElementById('contactName');
            if (name.value.trim() === '') {
                showError(name, 'Por favor, insira seu nome');
                isValid = false;
            }

            const email = document.getElementById('contactEmail');
            if (!validateEmail(email.value)) {
                showError(email, 'Por favor, insira um email válido');
                isValid = false;
            }
            
            const message = document.getElementById('contactMessage');
            if (message.value.trim() === '') {
                showError(message, 'Por favor, insira sua mensagem');
                isValid = false;
            }
            
            if (isValid) {
                setTimeout(() => {
                    contactForm.reset();
                    const successMsg = document.getElementById('contactSuccess');
                    successMsg.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
                    successMsg.style.display = 'block';

                    setTimeout(() => {
                        successMsg.style.display = 'none';
                    }, 5000);
                }, 1000);
            }
        });
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('newsletterEmail');
            const message = document.getElementById('newsletterMessage');
            
            if (!validateEmail(email.value)) {
                message.textContent = 'Por favor, insira um email válido';
                message.style.color = '#e53e3e';
                return;
            }

            message.textContent = 'Obrigado por assinar nossa newsletter!';
            message.style.color = 'white';
            newsletterForm.reset();

            setTimeout(() => {
                message.textContent = '';
            }, 5000);
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            resetErrors(this);

            let isValid = true;

            const name = document.getElementById('registerName');
            if (name.value.trim() === '') {
                showError(name, 'Por favor, insira seu nome completo');
                isValid = false;
            }

            const email = document.getElementById('registerEmail');
            if (!validateEmail(email.value)) {
                showError(email, 'Por favor, insira um email válido');
                isValid = false;
            }

            const password = document.getElementById('registerPassword');
            if (password.value.length < 6) {
                showError(password, 'A senha deve ter pelo menos 6 caracteres');
                isValid = false;
            }

            const confirmPassword = document.getElementById('registerConfirmPassword');
            if (confirmPassword.value !== password.value) {
                showError(confirmPassword, 'As senhas não coincidem');
                isValid = false;
            }

            const terms = document.getElementById('registerTerms');
            if (!terms.checked) {
                showError(terms, 'Você deve aceitar os termos para continuar');
                isValid = false;
            }
            
            if (isValid) {
                setTimeout(() => {
                    registerForm.reset();
                    const successMsg = document.getElementById('registerSuccess');
                    successMsg.textContent = 'Cadastro realizado com sucesso! Bem-vindo à TechSolutions.';
                    successMsg.style.display = 'block';
                    
                    setTimeout(() => {
                        successMsg.style.display = 'none';
                    }, 5000);
                }, 1000);
            }
        });
    }

    const suggestionsForm = document.getElementById('suggestionsForm');
    if (suggestionsForm) {
        suggestionsForm.addEventListener('submit', function(e) {
            e.preventDefault();

            resetErrors(this);

            let isValid = true;

            const message = document.getElementById('suggestionsMessage');
            if (message.value.trim() === '') {
                showError(message, 'Por favor, insira sua sugestão');
                isValid = false;
            }

            const email = document.getElementById('suggestionsEmail');
            if (email.value && !validateEmail(email.value)) {
                showError(email, 'Por favor, insira um email válido');
                isValid = false;
            }
            
            if (isValid) {
                setTimeout(() => {
                    suggestionsForm.reset();
                    const successMsg = document.getElementById('suggestionsSuccess');
                    successMsg.textContent = 'Sugestão enviada com sucesso! Agradecemos seu feedback.';
                    successMsg.style.display = 'block';

                    setTimeout(() => {
                        successMsg.style.display = 'none';
                    }, 5000);
                }, 1000);
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group') || input.closest('.checkbox-group');
        const errorElement = formGroup.querySelector('.error-message');
        input.style.borderColor = '#e53e3e';
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function resetErrors(form) {
        form.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
        });
        
        form.querySelectorAll('input, textarea, select').forEach(input => {
            input.style.borderColor = '#ddd';
        });
        
        const successMsg = form.querySelector('.success-message');
        if (successMsg) {
            successMsg.style.display = 'none';
        }
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
});
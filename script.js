(function() {
    const CONFIG_PASSWORD = "__PASSWORD_PLACEHOLDER__";
    const SESSION_KEY = "diophantine_auth";
    
    const loginOverlay = document.getElementById('login-overlay');
    const secureContent = document.getElementById('secure-content');
    const loginForm = document.getElementById('login-form');
    const passwordInput = document.getElementById('password-input');
    const loginError = document.getElementById('login-error');

    // Check if already authenticated
    if (localStorage.getItem(SESSION_KEY) === "true") {
        revealContent();
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = passwordInput.value;

        if (input === CONFIG_PASSWORD || CONFIG_PASSWORD.startsWith("__PASSWORD")) {
            // Success
            localStorage.setItem(SESSION_KEY, "true");
            revealContent();
        } else {
            // Failure
            loginError.style.display = 'block';
            passwordInput.value = '';
            passwordInput.focus();
            
            // Shake effect
            loginOverlay.querySelector('.login-card').animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(0)' }
            ], { duration: 400 });
        }
    });

    function revealContent() {
        loginOverlay.style.opacity = '0';
        loginOverlay.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            loginOverlay.style.display = 'none';
            secureContent.style.display = 'block';
            secureContent.style.opacity = '0';
            secureContent.style.transition = 'opacity 0.5s ease';
            // Trigger reflow
            void secureContent.offsetWidth;
            secureContent.style.opacity = '1';
        }, 500);
    }
})();

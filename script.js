document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');
    const navTriggers = document.querySelectorAll('.nav-trigger');
    const emailCopy = document.getElementById('email-copy');
    const langToggleBtn = document.getElementById('lang-toggle');

    let currentLang = 'en';

    // Function to switch language
    function setLanguage(lang) {
        currentLang = lang;
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('data-lang', lang);

        if (langToggleBtn) {
            langToggleBtn.textContent = lang === 'en' ? 'FR' : 'EN';
        }

        // Update all elements with data-en and data-fr attributes
        document.querySelectorAll('[data-en][data-fr]').forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = text;
                } else {
                    el.textContent = text;
                }
            }
        });
    }

    // Language toggle click event
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            const nextLang = currentLang === 'en' ? 'fr' : 'en';
            setLanguage(nextLang);
        });
    }

    // Function to switch active page
    function switchPage(pageId) {
        if (history.pushState) {
            history.pushState(null, null, `#${pageId}`);
        } else {
            location.hash = `#${pageId}`;
        }

        navLinks.forEach(link => {
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        sections.forEach(section => {
            if (section.id === pageId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Nav link click events
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('data-page');
            switchPage(targetPage);
        });
    });

    // In-page CTA triggers
    navTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = trigger.getAttribute('data-page');
            switchPage(targetPage);
        });
    });

    // Click to copy obfuscated email
    if (emailCopy) {
        emailCopy.addEventListener('click', () => {
            const actualEmail = 'thmsacar@gmail.com';
            navigator.clipboard.writeText(actualEmail).then(() => {
                const originalText = emailCopy.textContent;
                emailCopy.textContent = currentLang === 'fr' ? 'Copié dans le presse-papier !' : 'Copied to clipboard!';
                setTimeout(() => {
                    emailCopy.textContent = originalText;
                }, 2000);
            }).catch(() => {});
        });
    }

    // Initial language setup from hash if present (e.g. #fr)
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash === 'fr' || initialHash === 'en') {
        setLanguage(initialHash);
        switchPage('home');
    } else if (initialHash && document.getElementById(initialHash)) {
        switchPage(initialHash);
    } else {
        switchPage('home');
    }
});

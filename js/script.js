document.addEventListener('DOMContentLoaded', () => {
    initCacheCleanup();
    // Theme toggle intentionally disabled; site is fixed to dark mode.
    // Keep initThemeToggle() for future reactivation.
    initSmoothScrolling();
    initInactivityAutoscroll();
    initNavbar();
    initScrollReveal();
    initProjectsInteractions();

    initTypingAnimation();
    initEmailCopy();
    initParticles();
    initCounters();
    initFooterClock();
});

function initCacheCleanup() {
    if (!('serviceWorker' in navigator)) return;

    const basePath = window.location.pathname.replace(/[^/]*$/, '');

    navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => {
            registrations.forEach((registration) => {
                const scopePath = new URL(registration.scope).pathname;
                if (basePath.startsWith(scopePath)) {
                    registration.unregister();
                }
            });
        })
        .catch(() => { });
}

function initThemeToggle() {
    const toggleCheckbox = document.getElementById('theme-toggle');
    if (!toggleCheckbox) return;

    const themeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const storage = {
        get(key) {
            try {
                return localStorage.getItem(key);
            } catch (error) {
                return null;
            }
        },
        set(key, value) {
            try {
                localStorage.setItem(key, value);
            } catch (error) { }
        },
    };

    const getTheme = () => document.documentElement.dataset.theme || 'dark';

    const applyTheme = (theme, { persist = true } = {}) => {
        document.documentElement.dataset.theme = theme;

        if (persist) {
            storage.set('theme', theme);
        }

        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    };

    // Initialize theme
    if (!document.documentElement.dataset.theme) {
        const storedTheme = storage.get('theme');
        const theme = storedTheme || (themeQuery.matches ? 'dark' : 'light');
        document.documentElement.dataset.theme = theme;
    }



    // Toggle change handler (button click)
    toggleCheckbox.addEventListener('click', () => {
        const current = getTheme();
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
    });

    // Sync with system preference
    const syncWithSystem = () => {
        if (storage.get('theme')) return;
        applyTheme(themeQuery.matches ? 'dark' : 'light', { persist: false });
    };

    if (typeof themeQuery.addEventListener === 'function') {
        themeQuery.addEventListener('change', syncWithSystem);
    } else if (typeof themeQuery.addListener === 'function') {
        themeQuery.addListener(syncWithSystem);
    }
}




function initInactivityAutoscroll() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    if (window.scrollY > 0) return;
    if (window.location.hash && window.location.hash !== '#home') return;

    const target = document.getElementById('projects');
    if (!target) return;

    const sessionKey = 'autoscroll-featured-projects';
    const session = {
        get(key) {
            try {
                return sessionStorage.getItem(key);
            } catch (error) {
                return null;
            }
        },
        set(key, value) {
            try {
                sessionStorage.setItem(key, value);
            } catch (error) { }
        },
    };

    if (session.get(sessionKey)) return;
    session.set(sessionKey, '1');

    let timeoutId = null;

    const cleanup = () => {
        if (timeoutId !== null) {
            window.clearTimeout(timeoutId);
            timeoutId = null;
        }

        window.removeEventListener('mousemove', cleanup);
        window.removeEventListener('scroll', cleanup);
        window.removeEventListener('wheel', cleanup);
        window.removeEventListener('touchstart', cleanup);
        window.removeEventListener('pointerdown', cleanup);
        document.removeEventListener('keydown', cleanup);
    };

    window.addEventListener('mousemove', cleanup, { passive: true, once: true });
    window.addEventListener('scroll', cleanup, { passive: true, once: true });
    window.addEventListener('wheel', cleanup, { passive: true, once: true });
    window.addEventListener('touchstart', cleanup, { passive: true, once: true });
    window.addEventListener('pointerdown', cleanup, { passive: true, once: true });
    document.addEventListener('keydown', cleanup, { once: true });

    timeoutId = window.setTimeout(() => {
        cleanup();

        if (window.scrollY > 0) return;
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 5000);
}

function initNavbar() {
    const header = document.querySelector('header');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Sticky + Shrink Header
    const handleScroll = () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init check

    // Scrollspy for Active Pill
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Active when section is in middle of viewport
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active from all
                links.forEach(link => link.classList.remove('active'));

                // Add active to corresponding link
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}




function initSmoothScrolling() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior = prefersReducedMotion ? 'auto' : 'smooth';

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const href = anchor.getAttribute('href');
            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior });
        });
    });
}

function initScrollReveal() {
    const targets = document.querySelectorAll('.project-card, .section-title');
    if (!targets.length) return;

    targets.forEach((element) => element.classList.add('reveal', 'is-visible'));

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        return;
    }

    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    };

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observerInstance.unobserve(entry.target);
            });
        },
        { threshold: 0.1 }
    );

    targets.forEach((element) => observer.observe(element));

    window.requestAnimationFrame(() => {
        targets.forEach((element) => {
            if (isInViewport(element)) {
                observer.unobserve(element);
                return;
            }
            element.classList.remove('is-visible');
        });
    });
}



function getCanvasColors() {
    const styles = window.getComputedStyle(document.documentElement);
    const primaryHex = styles.getPropertyValue('--primary-color').trim() || '#38bdf8';
    const secondaryHex = styles.getPropertyValue('--secondary-color').trim() || '#818cf8';

    return {
        primary: hexToRgb(primaryHex) ?? { r: 56, g: 189, b: 248 },
        secondary: hexToRgb(secondaryHex) ?? { r: 129, g: 140, b: 248 },
    };
}

function rgba(color, alpha) {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
}

function hexToRgb(hex) {
    const value = hex.replace('#', '').trim();
    if (![3, 6].includes(value.length)) return null;

    const expanded = value.length === 3
        ? value.split('').map((char) => char + char).join('')
        : value;

    const number = Number.parseInt(expanded, 16);
    if (Number.isNaN(number)) return null;

    return {
        r: (number >> 16) & 255,
        g: (number >> 8) & 255,
        b: number & 255,
    };
}





// ===== Typing Animation for Name =====
function initTypingAnimation() {
    const element = document.getElementById('typing-name');
    const cursor = document.getElementById('name-cursor');
    if (!element) return;

    // Get text from data attribute
    const text = element.dataset.text || 'Daniel García';

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Show text immediately without animation
        element.textContent = text;
        if (cursor) {
            cursor.style.display = 'none';
        }
        return;
    }

    // Typing animation config
    const config = {
        charDelay: 55,         // ms per character (elegant speed)
        startDelay: 400,       // ms before starting
        cursorFadeDelay: 1500  // ms after typing to fade cursor
    };

    let charIndex = 0;

    function typeChar() {
        if (charIndex <= text.length) {
            element.textContent = text.substring(0, charIndex);
            charIndex++;
            setTimeout(typeChar, config.charDelay);
        } else {
            // Typing complete - fade out cursor
            if (cursor) {
                setTimeout(() => {
                    cursor.style.transition = 'opacity 0.5s ease';
                    cursor.style.opacity = '0';
                }, config.cursorFadeDelay);
            }
        }
    }

    // Start typing after initial delay
    setTimeout(typeChar, config.startDelay);
}



// ===== Copy Email to Clipboard =====
function initEmailCopy() {
    const emailButtons = document.querySelectorAll('.copy-email-btn');

    emailButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = btn.dataset.email || 'webdaniel2025@gmail.com';

            navigator.clipboard.writeText(email).then(() => {
                // Show feedback
                btn.classList.add('copied');

                // For contact section button with feedback span
                const feedback = btn.querySelector('.copy-feedback');
                if (feedback) {
                    feedback.classList.add('show');
                    setTimeout(() => {
                        feedback.classList.remove('show');
                        btn.classList.remove('copied');
                    }, 2000);
                } else {
                    // For header icon button - show tooltip
                    btn.setAttribute('title', '¡Copiado!');
                    setTimeout(() => {
                        btn.setAttribute('title', 'Copiar email');
                        btn.classList.remove('copied');
                    }, 2000);
                }
            }).catch(() => {
                // Fallback: open mailto
                window.location.href = 'mailto:' + email;
            });
        });
    });
}

// ===== Constellation Particles =====
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    const colors = ['#58A6FF', '#00D9FF', '#A371F7', '#3FB950'];

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = Math.random() * 0.5 + 0.3;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap around edges
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;

            // Mouse interaction
            if (mouse.x !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x -= dx * force * 0.02;
                    this.y -= dy * force * 0.02;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function init() {
        particles = [];
        const count = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        const maxDist = 120;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDist) {
                    const opacity = 1 - (dist / maxDist);
                    ctx.beginPath();
                    ctx.strokeStyle = particles[i].color;
                    ctx.globalAlpha = opacity * 0.15;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        connectParticles();
        requestAnimationFrame(animate);
    }

    // Mouse events
    canvas.parentElement.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    canvas.parentElement.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Initialize
    resize();
    init();
    animate();

    window.addEventListener('resize', () => {
        resize();
        init();
    });
}

// ===== Projects Modal & Interaction =====
function initProjectsInteractions() {
    const projectCards = document.querySelectorAll('.project-card[data-id]');
    const modal = document.getElementById('project-modal');
    const modalContainer = modal ? modal.querySelector('.modal-container') : null;
    const closeBtn = modal ? modal.querySelector('.modal-close') : null;
    const modalTitle = document.getElementById('modal-title');
    const modalStatus = document.getElementById('modal-status');
    const modalDescription = document.getElementById('modal-description');
    const modalDemo = document.getElementById('modal-demo');
    const modalGithub = document.getElementById('modal-github');
    const mainImage = document.getElementById('modal-image');
    const captionElement = document.getElementById('gallery-caption');
    const prevButton = document.getElementById('gallery-prev');
    const nextButton = document.getElementById('gallery-next');
    const thumbsContainer = document.getElementById('gallery-thumbs');
    const techContainer = document.getElementById('modal-tech-stack');
    const diagramContainer = document.getElementById('modal-tech-diagram');
    const featuresList = document.getElementById('modal-features');

    if (!projectCards.length ||
        !modal ||
        !modalContainer ||
        !closeBtn ||
        !modalTitle ||
        !modalStatus ||
        !modalDescription ||
        !modalDemo ||
        !modalGithub ||
        !mainImage ||
        !captionElement ||
        !prevButton ||
        !nextButton ||
        !thumbsContainer ||
        !techContainer ||
        !diagramContainer ||
        !featuresList) {
        return;
    }

    const projectData = {
        aidraft: {
            title: 'IDraft (AIDraft) - Generador Inteligente de Documentos Academicos',
            status: 'MVP / en desarrollo',
            statusClass: 'status-in-progress',
            tech: [
                { name: 'Next.js', icon: 'fas fa-layer-group' },
                { name: 'TypeScript', icon: 'fas fa-code' },
                { name: 'Tailwind CSS', icon: 'fas fa-wind' },
                { name: 'Prisma', icon: 'fas fa-database' },
                { name: 'NextAuth', icon: 'fas fa-user-shield' },
                { name: 'OpenAI / Groq', icon: 'fas fa-brain' }
            ],
            images: [
                {
                    src: './assets/AIDraft/PANTALLA 1.png',
                    caption: 'Inicio: subida de enunciado PDF/TXT y creacion del documento.'
                },
                {
                    src: './assets/AIDraft/BORRADOR.png',
                    caption: 'Borrador generado por IA listo para revision.'
                },
                {
                    src: './assets/AIDraft/EDITAR BORRADOR ARCHIVO.png',
                    caption: 'Editor final y preparacion de exportacion a Word (.docx).'
                }
            ],
            description: 'App full-stack que genera y edita borradores academicos desde PDF/TXT y los exporta a Word en un clic.',
            features: [
                'Generacion IA con plantillas FOC o generica.',
                'Gestion por usuario con autenticacion y proyectos.',
                'Exportacion final a .docx con estructura editable.'
            ],
            demo: null,
            github: 'https://github.com/danicode-dev/AIDraft'
        }
    };

    const statusClasses = ['status-completed', 'status-in-progress', 'status-maintenance'];
    const focusSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    let lastFocusedElement = null;
    let previousBodyOverflow = '';
    let currentProject = null;
    let currentImageIndex = 0;

    function getSafeExternalUrl(url) {
        if (typeof url !== 'string' || !url.trim()) return '#';

        try {
            const parsed = new URL(url, window.location.origin);
            if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return '#';
            return parsed.href;
        } catch {
            return '#';
        }
    }

    function isSafeClassName(className) {
        return typeof className === 'string' && /^[a-zA-Z0-9\s-]+$/.test(className);
    }

    function isSafeProjectImagePath(path) {
        return typeof path === 'string'
            && /^(?:\.\/)?assets\/(?:projects|AIDraft)\/[a-zA-Z0-9._/ -]+$/.test(path);
    }

    function normalizeImages(images, fallbackTitle, fallbackSrc) {
        const items = Array.isArray(images) ? images : [];
        const normalized = items
            .map((item, index) => {
                if (typeof item === 'string') {
                    return {
                        src: item,
                        caption: `${fallbackTitle} preview ${index + 1}`
                    };
                }

                if (item && typeof item === 'object') {
                    return {
                        src: typeof item.src === 'string' ? item.src : '',
                        caption: typeof item.caption === 'string' && item.caption.trim()
                            ? item.caption
                            : `${fallbackTitle} preview ${index + 1}`
                    };
                }

                return { src: '', caption: '' };
            })
            .filter((item) => isSafeProjectImagePath(item.src));

        if (!normalized.length && isSafeProjectImagePath(fallbackSrc)) {
            normalized.push({ src: fallbackSrc, caption: `${fallbackTitle} preview` });
        }

        return normalized;
    }

    function applySecureExternalLink(linkElement, url, ariaLabel) {
        const safeUrl = getSafeExternalUrl(url);
        const isDisabled = safeUrl === '#';

        linkElement.href = safeUrl;
        linkElement.rel = 'noopener noreferrer';
        linkElement.target = '_blank';
        linkElement.setAttribute('aria-label', ariaLabel);
        linkElement.setAttribute('aria-disabled', isDisabled ? 'true' : 'false');
        linkElement.classList.toggle('is-disabled', isDisabled);

        if (isDisabled) {
            linkElement.setAttribute('tabindex', '-1');
        } else {
            linkElement.removeAttribute('tabindex');
        }
    }

    function setProjectStatus(text, className) {
        statusClasses.forEach((statusClass) => modalStatus.classList.remove(statusClass));
        if (statusClasses.includes(className)) {
            modalStatus.classList.add(className);
        }
        modalStatus.textContent = text || 'Completed';
    }

    function getFocusableElements() {
        return Array.from(modalContainer.querySelectorAll(focusSelector)).filter((element) => {
            if (!(element instanceof HTMLElement)) return false;
            if (element.getAttribute('aria-hidden') === 'true') return false;
            if (element.getAttribute('aria-disabled') === 'true') return false;
            return element.offsetParent !== null;
        });
    }

    function trapModalFocus(event) {
        if (event.key !== 'Tab' || !modal.classList.contains('active')) return;

        const focusableElements = getFocusableElements();
        if (!focusableElements.length) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    function updateGalleryControls(imageCount) {
        const multipleImages = imageCount > 1;
        prevButton.hidden = !multipleImages;
        nextButton.hidden = !multipleImages;
        prevButton.disabled = !multipleImages;
        nextButton.disabled = !multipleImages;
        thumbsContainer.style.display = multipleImages ? 'flex' : 'none';
        captionElement.style.display = imageCount ? 'block' : 'none';
    }

    function updateThumbActiveState() {
        const thumbs = thumbsContainer.querySelectorAll('.gallery-thumb');
        thumbs.forEach((thumb, index) => {
            const isActive = index === currentImageIndex;
            thumb.classList.toggle('active', isActive);
            thumb.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
    }

    function setActiveImage(index) {
        if (!currentProject || !currentProject.images.length) return;

        const imageCount = currentProject.images.length;
        currentImageIndex = (index + imageCount) % imageCount;

        const activeImage = currentProject.images[currentImageIndex];
        mainImage.style.opacity = '0';

        window.setTimeout(() => {
            mainImage.src = activeImage.src;
            mainImage.alt = `${currentProject.title} preview ${currentImageIndex + 1}`;
            mainImage.style.opacity = '1';
        }, 120);

        captionElement.textContent = activeImage.caption || '';
        updateThumbActiveState();
    }

    function renderThumbnails() {
        thumbsContainer.replaceChildren();

        if (!currentProject || !currentProject.images.length) {
            updateGalleryControls(0);
            return;
        }

        currentProject.images.forEach((image, index) => {
            const thumbButton = document.createElement('button');
            thumbButton.type = 'button';
            thumbButton.className = `gallery-thumb ${index === currentImageIndex ? 'active' : ''}`;
            thumbButton.setAttribute('aria-label', `Show image ${index + 1}`);
            thumbButton.setAttribute('aria-pressed', index === currentImageIndex ? 'true' : 'false');

            const thumbImage = document.createElement('img');
            thumbImage.src = image.src;
            thumbImage.alt = image.caption || `${currentProject.title} thumbnail ${index + 1}`;

            thumbButton.appendChild(thumbImage);
            thumbButton.addEventListener('click', () => {
                setActiveImage(index);
            });

            thumbsContainer.appendChild(thumbButton);
        });

        updateGalleryControls(currentProject.images.length);
    }

    function renderTechStack(techItems) {
        techContainer.replaceChildren();

        (Array.isArray(techItems) ? techItems : []).forEach((techItem) => {
            const pill = document.createElement('div');
            pill.className = 'tech-pill';

            const icon = document.createElement('i');
            if (isSafeClassName(techItem.icon)) {
                icon.className = techItem.icon;
            } else {
                icon.className = 'fas fa-code';
            }

            const name = document.createElement('span');
            name.textContent = techItem.name || 'Tech';

            pill.appendChild(icon);
            pill.appendChild(name);
            techContainer.appendChild(pill);
        });
    }

    function renderTechDiagram(techItems) {
        diagramContainer.replaceChildren();

        const sanitizedTech = (Array.isArray(techItems) ? techItems : [])
            .map((item) => (item && typeof item.name === 'string' ? item.name.trim() : ''))
            .filter(Boolean);

        if (!sanitizedTech.length) return;

        sanitizedTech.forEach((techName, index) => {
            const node = document.createElement('span');
            node.className = 'tech-diagram-node';
            node.textContent = techName;
            diagramContainer.appendChild(node);

            if (index < sanitizedTech.length - 1) {
                const arrow = document.createElement('span');
                arrow.className = 'tech-diagram-arrow';
                arrow.setAttribute('aria-hidden', 'true');
                arrow.textContent = '->';
                diagramContainer.appendChild(arrow);
            }
        });
    }

    function renderFeatureList(features) {
        featuresList.replaceChildren();

        (Array.isArray(features) ? features : []).forEach((feature) => {
            const item = document.createElement('li');
            item.textContent = feature;
            featuresList.appendChild(item);
        });
    }

    function openModal(projectId, originElement) {
        const data = projectData[projectId];
        if (!data) return;

        const fallbackImage = document.querySelector(`.project-card[data-id="${projectId}"] .project-image img`);
        const fallbackSrc = fallbackImage ? fallbackImage.getAttribute('src') : '';

        currentProject = {
            ...data,
            images: normalizeImages(data.images, data.title, fallbackSrc)
        };
        currentImageIndex = 0;

        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;
        setProjectStatus(data.status, data.statusClass);

        applySecureExternalLink(modalDemo, data.demo, `Open demo for ${data.title}`);
        applySecureExternalLink(modalGithub, data.github, `Open repository for ${data.title}`);

        renderTechStack(data.tech);
        renderTechDiagram(data.tech);
        renderFeatureList(data.features);
        renderThumbnails();

        if (currentProject.images.length) {
            setActiveImage(0);
        } else {
            mainImage.removeAttribute('src');
            mainImage.alt = `${data.title} preview unavailable`;
            captionElement.textContent = '';
        }

        lastFocusedElement = originElement instanceof HTMLElement
            ? originElement
            : (document.activeElement instanceof HTMLElement ? document.activeElement : null);
        previousBodyOverflow = document.body.style.overflow;

        modal.setAttribute('aria-hidden', 'false');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    function closeModal() {
        if (!modal.classList.contains('active')) return;

        modal.setAttribute('aria-hidden', 'true');
        modal.classList.remove('active');
        document.body.style.overflow = previousBodyOverflow;
        currentProject = null;

        if (lastFocusedElement instanceof HTMLElement) {
            lastFocusedElement.focus();
        }
    }

    projectCards.forEach((card) => {
        const projectId = card.dataset.id;
        if (!projectId) return;

        card.querySelectorAll('.project-details-trigger').forEach((trigger) => {
            trigger.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                openModal(projectId, trigger);
            });
        });

        card.addEventListener('click', (event) => {
            if (event.target.closest('a, button')) return;
            openModal(projectId, card);
        });
    });

    prevButton.addEventListener('click', () => {
        setActiveImage(currentImageIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        setActiveImage(currentImageIndex + 1);
    });

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
            return;
        }

        trapModalFocus(event);
    });
}

// ===== Animated Counters =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Observer to start animation when visible
    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');

                if (prefersReducedMotion) {
                    counter.textContent = target + '+';
                    observerInstance.unobserve(counter);
                    return;
                }

                // Animation logic
                const duration = 2000; // 2 seconds
                const frameDuration = 1000 / 60; // 60fps
                const totalFrames = Math.round(duration / frameDuration);
                let currentFrame = 0;

                const easeOutQuad = t => t * (2 - t);

                const animate = () => {
                    currentFrame++;
                    const progress = easeOutQuad(currentFrame / totalFrames);
                    const currentCount = Math.round(target * progress);

                    if (currentFrame < totalFrames) {
                        counter.textContent = currentCount + '+';
                        requestAnimationFrame(animate);
                    } else {
                        counter.textContent = target + '+';
                    }
                };

                animate();
                observerInstance.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5 // Start when 50% visible
    });

    counters.forEach(counter => observer.observe(counter));
}

// Footer Clock - Real-time update
function initFooterClock() {
    const timeEl = document.getElementById('footer-time');
    const dateEl = document.getElementById('footer-date');
    if (!timeEl || !dateEl) return;

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    function getOrdinal(n) {
        const s = ['th', 'st', 'nd', 'rd'];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');

        timeEl.textContent = `${hours}:${mins}`;
        dateEl.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${getOrdinal(now.getDate())}, ${now.getFullYear()}`;
    }

    updateClock();
    setInterval(updateClock, 1000);
}

// Footer Typing Animation
function initFooterTyping() {
    const element = document.getElementById('footer-typing-name');
    const cursor = document.getElementById('footer-cursor');
    if (!element) return;

    const text = 'Daniel García · Aspiring Full-Stack Developer';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        element.textContent = text;
        if (cursor) cursor.style.display = 'none';
        return;
    }

    let hasAnimated = false;
    let charIndex = 0;

    function typeChar() {
        if (charIndex <= text.length) {
            element.textContent = text.substring(0, charIndex);
            charIndex++;
            setTimeout(typeChar, 50);
        } else {
            if (cursor) {
                setTimeout(() => {
                    cursor.style.transition = 'opacity 0.5s ease';
                    cursor.style.opacity = '0';
                }, 1500);
            }
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                setTimeout(typeChar, 300);
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(element);
}

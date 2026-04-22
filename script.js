/**
 * CYBERSECURITY PORTFOLIO - SCRIPT.JS
 * Author: Anushka Weerakkodi
 * Features: Typing animation, terminal, scroll effects, form handling
 */

// ===== DOM ELEMENTS =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');
const backToTopBtn = document.getElementById('backToTop');
const typingText = document.getElementById('typing-text');
const terminalInput = document.getElementById('terminalInput');
const terminalMain = document.getElementById('terminalMain');
const contactForm = document.getElementById('contactForm');

// ===== TYPING ANIMATION CONFIG =====
const typingPhrases = [
    'Aspiring Cybersecurity Analyst',
    'Ethical Hacking Enthusiast',
    'CTF Player',
    'Network Defender',
    'Vulnerability Researcher'
];

const typingSpeed = 100; // ms per character
const deletingSpeed = 50; // ms per character
const pauseTime = 2000; // ms between phrases

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

// ===== NAVIGATION =====
// Toggle mobile menu
navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top button visibility
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Back to top functionality
backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== TYPING ANIMATION =====
function typeEffect() {
    const currentPhrase = typingPhrases[phraseIndex];
    
    if (isDeleting) {
        // Deleting text
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % typingPhrases.length;
            setTimeout(typeEffect, 500);
            return;
        }
    } else {
        // Typing text
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(typeEffect, pauseTime);
            return;
        }
    }
    
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeEffect, speed);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typing animation
    setTimeout(typeEffect, 1000);
    
    // Set current year in footer
    const currentYear = document.getElementById('currentYear');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // Initialize scroll reveal animations
    initScrollReveal();
    
    // Initialize skill progress bars
    initSkillBars();
    
    // Initialize counter animation for stats
    initCounters();
    
    // Initialize terminal
    initTerminal();
});

// ===== SCROLL REVEAL ANIMATIONS =====
function initScrollReveal() {
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    scrollElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== SKILL PROGRESS BARS =====
function initSkillBars() {
    const progressBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = `${progress}%`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// ===== COUNTER ANIMATION FOR STATS =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// ===== INTERACTIVE TERMINAL =====
const terminalCommands = {
    help: `Available commands:
  • whoami    - Display user information
  • skills    - List technical skills
  • projects  - Show project highlights
  • contact   - Display contact information
  • clear     - Clear terminal screen
  • date      - Show current date/time
  • exit      - Close terminal (just kidding!)`,
  
  whoami: 'anushka_weerakkodi\nAspiring Cybersecurity Analyst | CTF Enthusiast',
  
  skills: `🔴 Offensive: Nmap, Metasploit, Vulnerability Scanning
🔵 Defensive: Network Defense, Firewall Config, Incident Response
🌐 Networking: VLAN, Routing, DHCP, WPA2 Security
💻 Other: Virtualization, Basic Web Dev`,
  
  projects: `1. Metasploitable 2 Penetration Lab
   - Nmap scanning, Metasploit exploitation, root access
   
2. Cisco Networking Labs
   - Secure router config, VLAN setup, Inter-VLAN routing`,
  
  contact: `📧 Email: your.email@example.com
🐙 GitHub: github.com/anushkaweerakkodi
📍 Location: Sri Lanka`,
  
  date: () => new Date().toString(),
  
  clear: 'CLEAR'
};

function initTerminal() {
    if (!terminalInput || !terminalMain) return;
    
    // Focus terminal input on click
    terminalMain.addEventListener('click', () => {
        terminalInput.focus();
    });
    
    // Handle keyboard input
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            processCommand(terminalInput.textContent.trim());
            terminalInput.textContent = '';
        } else if (e.key === 'Tab') {
            e.preventDefault();
            // Simple tab completion for demo
            const commands = Object.keys(terminalCommands);
            const input = terminalInput.textContent.trim();
            const match = commands.find(cmd => cmd.startsWith(input));
            if (match) {
                terminalInput.textContent = match + ' ';
            }
        }
    });
    
    // Keep focus on terminal input
    terminalInput.addEventListener('blur', () => {
        // Optional: keep focus or show hint
    });
}

function processCommand(command) {
    // Add command to terminal output
    addTerminalLine(`<span class="prompt">$</span> ${command}`);
    
    // Process command
    const cmd = command.toLowerCase().split(' ')[0];
    const handler = terminalCommands[cmd];
    
    if (handler) {
        if (cmd === 'clear') {
            // Clear terminal except welcome message
            const lines = terminalMain.querySelectorAll('.terminal-line');
            lines.forEach((line, index) => {
                if (index > 0 && !line.classList.contains('welcome')) {
                    line.remove();
                }
            });
            // Re-add input line
            addInputLine();
        } else if (typeof handler === 'function') {
            const output = handler();
            output.split('\n').forEach(line => {
                addTerminalLine(`<span class="output">${line}</span>`);
            });
            addInputLine();
        } else {
            handler.split('\n').forEach(line => {
                addTerminalLine(`<span class="output">${line}</span>`);
            });
            addInputLine();
        }
    } else if (command === '') {
        addInputLine();
    } else {
        addTerminalLine(`<span class="error">Command not found: ${command}</span>`);
        addTerminalLine(`<span class="muted">Type 'help' for available commands</span>`);
        addInputLine();
    }
    
    // Auto-scroll to bottom
    terminalMain.scrollTop = terminalMain.scrollHeight;
}

function addTerminalLine(html) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = html;
    // Insert before the input line
    const inputLine = terminalMain.querySelector('#terminalInput').closest('.terminal-line');
    terminalMain.insertBefore(line, inputLine);
}

function addInputLine() {
    // Input line already exists, just ensure it's visible
    const inputLine = terminalMain.querySelector('.terminal-line:last-child');
    if (inputLine && inputLine.querySelector('#terminalInput')) {
        inputLine.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
}

/* ===== 📧 CONTACT FORM - FIXED FOR FORMSPREE ===== */
if (contactForm) {
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent page reload
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        try {
            // Send data to Formspree using fetch API
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success!
                contactForm.reset();
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                
                // Show success message below form
                const successMsg = document.createElement('p');
                successMsg.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
                successMsg.style.color = 'var(--neon-green)';
                successMsg.style.marginTop = '1rem';
                successMsg.style.textAlign = 'center';
                
                // Remove old messages if any
                const oldMsg = contactForm.querySelector('p[style*="color"]');
                if (oldMsg) oldMsg.remove();
                
                contactForm.appendChild(successMsg);
                
                // Reset button after 5 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }, 5000);
                
            } else {
                throw new Error('Submission failed');
            }
            
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Something went wrong. Please try again or email me directly at anushkaweerakkodi90@gmail.com');
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// ===== ADDITIONAL INTERACTIONS =====
// Add hover effect to project cards on mobile
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('touchstart', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('touchend', function() {
        this.style.transform = '';
    });
});

// Prevent default drag behavior on terminal input
terminalInput?.addEventListener('dragstart', (e) => e.preventDefault());

// ===== PERFORMANCE: Lazy load images (if added later) =====
// Example: Add loading="lazy" to img tags for better performance

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Portfolio error:', e.message);
    // Could send to monitoring service in production
});

// ===== CONSOLE EASTER EGG =====
console.log('%c🔐 Welcome to Anushka\'s Cyber Portfolio!', 'color: #00ff9d; font-size: 16px; font-weight: bold;');
console.log('%cInterested in cybersecurity? Let\'s connect!', 'color: #00d4ff; font-size: 14px;');
console.log('%cGitHub: https://github.com/anushkaweerakkodi', 'color: #718096; font-size: 12px;');

// ===== INIT COMPLETE =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Portfolio initialized successfully');
});

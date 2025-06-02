function copyToClipboard(text, event) {
    navigator.clipboard.writeText(text).then(() => {
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        setTimeout(() => {
            button.textContent = originalText;
        }, 1500);
        // Show notification
        const notif = document.getElementById('copy-notification');
        if (notif) {
            notif.style.display = 'block';
            clearTimeout(window.copyNotifTimeout);
            window.copyNotifTimeout = setTimeout(() => {
                notif.style.display = 'none';
            }, 3000);
        }
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// Theme management
function setTheme(isDark) {
    if (isDark) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function toggleDarkMode() {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    setTheme(currentTheme === 'light');
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('dark-mode');

    // Add smooth scrolling to all links
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

    // Add hover effect to category cards
    const cards = document.querySelectorAll('.category-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

function filterCommands() {
    const searchInput = document.getElementById('searchInput');
    const filter = searchInput.value.toLowerCase();
    const commandCards = document.getElementsByClassName('command-card');

    for (const card of commandCards) {
        const commandText = card.querySelector('.command-text').textContent.toLowerCase();
        const titleText = card.querySelector('h3').textContent.toLowerCase();
        const shouldShow = commandText.includes(filter) || titleText.includes(filter);
        card.style.display = shouldShow ? '' : 'none';
    }
}

function toggleSectionDropdown(button) {
    const section = button.closest('.command-section');
    const grid = section.querySelector('.command-grid');
    const chevron = button.querySelector('.chevron');
    if (grid.style.display === 'none') {
        grid.style.display = '';
        chevron.textContent = '▼';
    } else {
        grid.style.display = 'none';
        chevron.textContent = '►';
    }
}

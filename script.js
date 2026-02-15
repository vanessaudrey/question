// Get references to our buttons and elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const celebration = document.getElementById('celebration');
const container = document.querySelector('.container');

// Track how many times NO button has been attempted
let noClickCount = 0;

// When YES button is clicked
yesBtn.addEventListener('click', function() {
    container.classList.add('hidden');
    celebration.classList.remove('hidden');
    createConfetti();
});

// When mouse hovers over NO button - make it run away!
noBtn.addEventListener('mouseenter', function() {
    moveNoButton();
});

// When NO button is clicked - shrink it and move it
noBtn.addEventListener('click', function() {
    noClickCount++;
    shrinkNoButton();
    moveNoButton();
});

// Function to move the NO button to a random position
function moveNoButton() {
    const maxX = window.innerWidth - noBtn.offsetWidth - 50;
    const maxY = window.innerHeight - noBtn.offsetHeight - 50;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

// Function to shrink the NO button
function shrinkNoButton() {
    const currentSize = 24 - (noClickCount * 2);
    if (currentSize > 8) {
        noBtn.style.fontSize = currentSize + 'px';
        noBtn.style.padding = (20 - noClickCount * 2) + 'px ' + (50 - noClickCount * 5) + 'px';
    }
}

// Function to create confetti animation
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(function() {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            
            document.body.appendChild(confetti);
            
            const duration = Math.random() * 3 + 2;
            const xMovement = (Math.random() - 0.5) * 200;
            
            confetti.animate([
                { transform: 'translateY(0px) translateX(0px) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight}px) translateX(${xMovement}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            setTimeout(() => confetti.remove(), duration * 1000);
        }, i * 30);
    }
}

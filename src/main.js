import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  const doorOverlay = document.getElementById('door-overlay');
  const appContent = document.getElementById('app');

  // Handle door opening
  doorOverlay.addEventListener('click', () => {
    // Add open class to animate doors
    doorOverlay.classList.add('door-open');
    
    // Show main content and fade it in
    appContent.classList.remove('hidden');
    
    // Using a tiny timeout to allow display:block to apply before changing opacity
    setTimeout(() => {
      appContent.classList.add('visible');
    }, 50);

    // After door animation finishes, remove overlay from DOM
    setTimeout(() => {
      doorOverlay.style.display = 'none';
      startPetals();
    }, 1500); // matches the 1.5s transition
  });

  // Falling petals logic
  function startPetals() {
    const petalsContainer = document.getElementById('petals');
    
    function createPetal() {
      const petal = document.createElement('div');
      petal.classList.add('petal');
      
      // Randomize properties
      const startLeft = Math.random() * 100; // 0 to 100vw
      const animationDuration = 5 + Math.random() * 5; // 5s to 10s
      const width = 10 + Math.random() * 15; // 10px to 25px
      const height = width * 1.2;
      const colors = ['#ff6b6b', '#ff4757', '#ff7f50', '#ffa502'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      petal.style.left = `${startLeft}vw`;
      petal.style.animationDuration = `${animationDuration}s`;
      petal.style.width = `${width}px`;
      petal.style.height = `${height}px`;
      petal.style.backgroundColor = color;
      
      // Add a slight box shadow for realism
      petal.style.boxShadow = 'inset 0 0 5px rgba(0,0,0,0.1)';
      
      petalsContainer.appendChild(petal);
      
      // Remove petal after it falls
      setTimeout(() => {
        petal.remove();
      }, animationDuration * 1000);
    }
    
    // Create a new petal every 300ms
    setInterval(createPetal, 300);
  }

  // Team Selection Logic
  let selectedTeam = "";
  const teamBride = document.getElementById('team-bride');
  const teamGroom = document.getElementById('team-groom');
  const badgeBride = document.getElementById('badge-bride');
  const badgeGroom = document.getElementById('badge-groom');
  const teamSelectionText = document.getElementById('team-selection-text');

  function selectTeam(teamId, badgeId, teamNameStr) {
    teamBride.classList.remove('selected');
    teamGroom.classList.remove('selected');
    badgeBride.classList.add('hidden');
    badgeGroom.classList.add('hidden');

    document.getElementById(teamId).classList.add('selected');
    document.getElementById(badgeId).classList.remove('hidden');
    
    selectedTeam = teamNameStr;
    teamSelectionText.textContent = `You're cheering for Team ${teamNameStr}! 🌺`;
    teamSelectionText.classList.remove('hidden');
  }

  if (teamBride && teamGroom) {
    teamBride.addEventListener('click', () => selectTeam('team-bride', 'badge-bride', 'Bride - Meghana'));
    teamGroom.addEventListener('click', () => selectTeam('team-groom', 'badge-groom', 'Groom - Hariraj'));
  }

  // Countdown Logic (Target: Dec 12, 2026 12:00 PM)
  const targetDate = new Date('December 12, 2026 12:00:00').getTime();
  
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  function updateCountdown() {
    if (!daysEl) return;
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days < 10 ? '0' + days : days;
    hoursEl.textContent = hours < 10 ? '0' + hours : hours;
    minsEl.textContent = minutes < 10 ? '0' + minutes : minutes;
    secsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // WhatsApp RSVP Logic
  const attendanceBtns = document.querySelectorAll('.btn-attend');
  const attendingInput = document.getElementById('rsvp-attending');
  
  attendanceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      attendanceBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      attendingInput.value = btn.getAttribute('data-value');
    });
  });

  const rsvpForm = document.getElementById('whatsapp-rsvp-form');
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('rsvp-name').value;
      const attending = document.getElementById('rsvp-attending').value;
      const guests = document.getElementById('rsvp-guests').value;
      
      let message = `Hi! This is ${name}.\n\n`;
      if (attending === 'Yes') {
        message += `I Joyfully Accept the invitation for the engagement ceremony! ✨\nNumber of guests: ${guests}\n`;
      } else {
        message += `I Regretfully Decline the invitation, but send my best wishes! ❤️\n`;
      }
      
      if (selectedTeam) {
        message += `\nP.S. I'm cheering for Team ${selectedTeam}! 🎉`;
      }

      // Encode the message for a URL
      const encodedMessage = encodeURIComponent(message);
      
      // WhatsApp Number
      const whatsappNumber = '9107012835983'; 
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      // Open in new tab
      window.open(whatsappUrl, '_blank');
    });
  }

  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
});

  const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    const dotsNav = document.querySelector('.carousel-dots');

    let slideWidth;
    let currentIndex = 1; // start at the *real* first slide (after clone)
    let intervalId;
    let startX = 0, endX = 0;

    // Create dots (excluding clones)
    for (let i = 0; i < slides.length - 2; i++) {
      const dot = document.createElement('button');
      if (i === 0) dot.classList.add('active');
      dotsNav.appendChild(dot);
    }
    const dots = Array.from(dotsNav.children);

    function updateCarousel(animate = true) {
      slideWidth = slides[0].getBoundingClientRect().width;
      track.style.transition = animate ? "transform 0.5s ease-in-out" : "none";
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

      // Update dots (sync with real slides)
      dots.forEach(dot => dot.classList.remove('active'));
      let dotIndex = currentIndex - 1;
      if (dotIndex >= dots.length) dotIndex = 0;
      if (dotIndex < 0) dotIndex = dots.length - 1;
      dots[dotIndex].classList.add('active');
    }

    function nextSlide() {
      currentIndex++;
      updateCarousel();
    }

    function prevSlide() {
      currentIndex--;
      updateCarousel();
    }

    function goToSlide(index) {
      currentIndex = index + 1; // offset by 1 due to clone
      updateCarousel();
    }

    // Infinite loop fix after transition
    track.addEventListener('transitionend', () => {
      if (slides[currentIndex].alt === "Clone First") {
        currentIndex = 1;
        updateCarousel(false);
      }
      if (slides[currentIndex].alt === "Clone Last") {
        currentIndex = slides.length - 2;
        updateCarousel(false);
      }
    });

    // Buttons
    nextBtn.addEventListener('click', () => {
      nextSlide();
      restartAutoplay();
    });
    prevBtn.addEventListener('click', () => {
      prevSlide();
      restartAutoplay();
    });

    // Dots click
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goToSlide(i);
        restartAutoplay();
      });
    });

    // Autoplay
    function startAutoplay() {
      intervalId = setInterval(nextSlide, 3000);
    }
    function stopAutoplay() {
      clearInterval(intervalId);
    }
    function restartAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    // Pause on hover
    document.querySelector('.carousel').addEventListener('mouseenter', stopAutoplay);
    document.querySelector('.carousel').addEventListener('mouseleave', startAutoplay);

    // Touch swipe
    track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    track.addEventListener('touchend', e => {
      endX = e.changedTouches[0].clientX;
      if (endX < startX - 50) nextSlide();
      if (endX > startX + 50) prevSlide();
      restartAutoplay();
    });

    // Resize support
    window.addEventListener('resize', () => updateCarousel(false));

    // Init
    updateCarousel(false);
    startAutoplay();

clicks.addEventListener("click", () => {

    fetch("https://official-joke-api.appspot.com/random_joke")
   .then(response => response.json())
   .then(data => {
    console.log(data)
    setCurrentJoke(data);

    const setup = document.querySelector("#setup")
    setup.textContent = data.setup

    const punchline = document.querySelector("#punchline")
    punchline.textContent = data.punchline

    
    
})

})

next.addEventListener("click", () => {

    fetch("https://official-joke-api.appspot.com/random_joke")
    .then(response => response.json())
    .then(data => {
     console.log(data)
     setCurrentJoke(data);
 
     const setup = document.querySelector("#setup")
     setup.textContent = data.setup
 
     const punchline = document.querySelector("#punchline")
     punchline.textContent = data.punchline

 })
   
})

// reference to your save button
const save = document.querySelector("#save");

// to hold the last joke shown
let currentJoke = {};

// update currentJoke every time a new one is fetched
function setCurrentJoke(data) {
  currentJoke = data;
}



async function getFact() {
    const res = await fetch("https://uselessfacts.jsph.pl/random.json?language=en");
    const data = await res.json();
    document.getElementById("fact").innerText = data.text;
  }
  getFact();

  // Compliment Generator
  const compliments = [
    "You have a great sense of humor 🌟",
    "Your smile makes everything brighter 😁",
    "You're as refreshing as lemonade on a hot day 🍋",
    "You make the world a better place 💕",
    "You're basically sunshine with legs ☀️",
    "Your creativity is inspiring 🎨",
    "You're cooler than the other side of the pillow ❄️"
  ];
  function getCompliment() {
    const random = compliments[Math.floor(Math.random() * compliments.length)];
    document.getElementById("compliment").innerText = random;
  }

  // Mood Background Changer
  const colors = [
    "linear-gradient(135deg, #ff9a9e, #fad0c4)",
    "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
    "linear-gradient(135deg, #fddb92, #d1fdff)",
    "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
    "linear-gradient(135deg, #d4fc79, #96e6a1)"
  ];
  function changeMood() {
    document.body.style.background = colors[Math.floor(Math.random() * colors.length)];
  }

  // Live Clock
  function updateClock() {
    const now = new Date();
    document.getElementById("clock").innerText =
      now.toLocaleTimeString();
  }
  setInterval(updateClock, 1000);
  updateClock();

  // Random Cat API
  async function getCat() {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await res.json();
    document.getElementById("cat").src = data[0].url;
  }
  getCat();

  // 🎈 Random Floating Emojis
  const emojiList = ["💖", "🌟", "✨", "💫", "💕", "🌸", "🌈", "⭐", "💎"];
  const container = document.querySelector(".floating-icons");

  function createEmoji() {
    const emoji = document.createElement("span");
    emoji.classList.add("emoji");
    emoji.innerText = emojiList[Math.floor(Math.random() * emojiList.length)];

    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.fontSize = (Math.random() * 2 + 1) + "em";
    const duration = Math.random() * 5 + 5;
    emoji.style.animationDuration = duration + "s";

    container.appendChild(emoji);
    setTimeout(() => emoji.remove(), duration * 1000);
  }
  setInterval(createEmoji, 800);

  // 3D Tilt Effect
  document.querySelectorAll(".tilt").forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * 20;
      const rotateY = ((x / rect.width) - 0.5) * -20;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = `rotateX(0) rotateY(0)`;
    });
  });

  // Button Particle Burst
  document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", e => {
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement("span");
        particle.className = "particle";
        particle.innerText = ["✨","💖","🌟"][Math.floor(Math.random()*3)];
        particle.style.position = "absolute";
        particle.style.left = e.offsetX + "px";
        particle.style.top = e.offsetY + "px";
        particle.style.pointerEvents = "none";
        particle.style.setProperty("--x", (Math.random()*100-50) + "px");
        particle.style.setProperty("--y", (Math.random()*100-50) + "px");
        particle.style.animation = "explode 600ms forwards";
        btn.appendChild(particle);
        setTimeout(()=>particle.remove(),600);
      }
    });
  });

  // Particle Animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes explode {
      to {
        transform: translate(var(--x), var(--y)) scale(0);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

    let currentAudio;

  function playMusic(mood) {
    if (currentAudio) currentAudio.pause();

    let src = "";
    if (mood === "chill") src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    if (mood === "happy") src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3";
    if (mood === "study") src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3";

    currentAudio = new Audio(src);
    currentAudio.loop = true;
    currentAudio.play();
  }

  function stopMusic() {
    if (currentAudio) currentAudio.pause();
  }


   const faces = ["😀","😎","🥳","🤩","😜","🤖","👽","🐱","🐼","🦄","👾","👸","🧙‍♂️"];
  const accessories = ["🎩","👑","🕶️","🎧","🎭","🌈","🔥","💎","⚡","🍕","🎮"];
  const bodies = ["🧑","👩","👨","🧟","🧛","🦸","🦹","🐉","🐧","🦊"];

  function generateAvatar() {
    const face = faces[Math.floor(Math.random() * faces.length)];
    const accessory = accessories[Math.floor(Math.random() * accessories.length)];
    const body = bodies[Math.floor(Math.random() * bodies.length)];

    document.getElementById("avatarDisplay").innerText = `${face}${accessory}${body}`;
  }


   const footerDecor = document.querySelector("#lovely-footer .floating-decor");
  const footerEmojis = ["💖","✨","🌸","⭐","🌈","💫"];
  function createFooterEmoji() {
    const emoji = document.createElement("span");
    emoji.classList.add("footer-emoji");
    emoji.innerText = footerEmojis[Math.floor(Math.random() * footerEmojis.length)];
    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.fontSize = (Math.random() * 2 + 1) + "em";
    emoji.style.animationDuration = (Math.random() * 4 + 6) + "s";
    footerDecor.appendChild(emoji);
    setTimeout(() => emoji.remove(), 10000);
  }
  setInterval(createFooterEmoji, 1000);

  // 📅 Auto Year
  document.getElementById("year").innerText = new Date().getFullYear();

  // ⬆️ Scroll to Top
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // 🎶 Toggle Background Music
  let footerMusic = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3");
  footerMusic.loop = true;
  let musicPlaying = false;

  function toggleMusic() {
    if (musicPlaying) {
      footerMusic.pause();
      musicPlaying = false;
    } else {
      footerMusic.play();
      musicPlaying = true;
    }
  }

  // 🌗 Theme Toggle
  function toggleTheme() {
    document.body.classList.toggle("dark-mode");
  }



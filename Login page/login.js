const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

function moveSlider() {
  let index = this.dataset.value;

  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList.remove("active"));
  this.classList.add("active");
}

bullets.forEach((bullet) => {
  bullet.addEventListener("click", moveSlider);
});

// Add ripple effect to buttons
const buttons = document.querySelectorAll('.sign-btn');
buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    
    let ripple = document.createElement('div');
    ripple.classList.add('ripple');
    this.appendChild(ripple);

    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    setTimeout(() => {
      ripple.remove();
    }, 1000);
  });
});

// Add smooth transitions for carousel
let autoSlide = setInterval(() => {
  const activeSlide = document.querySelector('.bullets span.active');
  const nextSlide = activeSlide.nextElementSibling || bullets[0];
  nextSlide.click();
}, 5000);

// Pause auto-slide on hover
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
carousel.addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => {
    const activeSlide = document.querySelector('.bullets span.active');
    const nextSlide = activeSlide.nextElementSibling || bullets[0];
    nextSlide.click();
  }, 5000);
});

// Add input validation feedback
inputs.forEach(input => {
  input.addEventListener('input', function() {
    if (this.type === 'email') {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
      this.style.borderBottomColor = isValid ? '#4CAF50' : '#f44336';
    }
    if (this.type === 'password') {
      const isStrong = this.value.length >= 8;
      this.style.borderBottomColor = isStrong ? '#4CAF50' : '#f44336';
    }
  });
});
const links = document.querySelectorAll('nav a');

links.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

const cards = document.querySelectorAll('.card');

window.addEventListener('scroll', () => {
  const trigger = window.innerHeight * 0.8;

  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < trigger) {
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }
  });
});
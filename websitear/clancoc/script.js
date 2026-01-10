
const items = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target); // animasi cuma sekali
      }
    });
  },
  
);

items.forEach(item => observer.observe(item));

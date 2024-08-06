export function scrollLeft() {
    const carousel = document.querySelector('.content');
    carousel.scrollBy({
      top: 0,
      left: -200,
      behavior: 'smooth'
    });
  }
  
export function scrollRight() {
    const carousel = document.querySelector('.content');
    carousel.scrollBy({
      top: 0,
      left: 200,
      behavior: 'smooth'
    });
  }

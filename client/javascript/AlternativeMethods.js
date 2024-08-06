export function scrollLeft(content) {
    const carousel = document.getElementById(content);
    carousel.scrollBy({
      top: 0,
      left: -200,
      behavior: 'smooth'
    });
  }
  
export function scrollRight(content) {
    const carousel = document.getElementById(content);
    carousel.scrollBy({
      top: 0,
      left: 200,
      behavior: 'smooth'
    });
  }

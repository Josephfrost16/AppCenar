import {jwtDecode} from 'jwt-decode';

export function scrollLeft(content) {
    const carousel = document.getElementById(content);
    carousel.scrollBy({
      top: 0,
      left: -300,
      behavior: 'smooth'
    });
  }
  
export function scrollRight(content) {
    const carousel = document.getElementById(content);
    carousel.scrollBy({
      top: 0,
      left: 300,
      behavior: 'smooth'
    });
  }

export function decodeToken(token){
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Token decofied Error',error);
      return null;
    }
}

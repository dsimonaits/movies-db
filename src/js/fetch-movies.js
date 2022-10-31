import Notiflix from 'notiflix';
import axios from 'axios';

export { fetchMovies };

const KEY = '4c2c309e2c0263a8769257d39e3c269a';

async function fetchMovies(page) {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/trending/movie/week?',
      {
        params: {
          api_key: KEY,
          page: page,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Something went wrong');
  }
}

// export class FetchPixabay {
//   static URL = 'https://pixabay.com/api/';
//   static #API = '30781043-697065eb175f1ee93924e4241';

//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//   }

//   async fetch() {
//     const params = new URLSearchParams({
//       key: FetchPixabay.#API,
//       q: this.searchQuery,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: 'true',
//       page: this.page,
//       per_page: 40,
//     });

//     const result = await fetch(`${FetchPixabay.URL}?${params}`);

//     return result.ok
//       ? result.json()
//       : Promise.reject(Notiflix.Notify.failure('Something went wrong'));
//   }
// }

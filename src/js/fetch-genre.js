import Notiflix from 'notiflix';
import axios from 'axios';

export { fetchGenre };

const KEY = '4c2c309e2c0263a8769257d39e3c269a';

const URL = 'https://api.themoviedb.org/3/genre/movie/list?';

async function fetchGenre() {
  try {
    const response = await axios.get(`${URL}?`, {
      params: {
        api_key: KEY,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Something went wrong');
  }
}

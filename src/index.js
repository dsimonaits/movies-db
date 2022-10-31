import { fetchMovies } from './js/fetch-movies';
import { renderMarkup } from './js/renderMarkup';
import { Notify } from './js/notify';

let query = '';
let page = 1;

const refs = {
  form: document.querySelector('.search'),
  movies_list: document.querySelector('.movies_list'),
};

const fetchTopMovies = async () => {
  try {
    const data = await fetchMovies();
    const fetchData = data.data.results;

    console.log(data);
    Notify.addLoading();

    renderMarkup(fetchData, refs.movies_list);
    Notify.success(`Hooray! We found ${fetchData.totalResults} images.`);
  } catch (error) {
    console.log(error);
    Notify.failure('Something went wrong');
  }
  Notify.removeLoading();
};

fetchTopMovies();

function clearSearchContent() {
  refs.movies_list.innerHTML = '';
}

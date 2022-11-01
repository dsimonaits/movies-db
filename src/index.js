import { fetchMovies } from './js/fetch-movies';
import { renderMarkup } from './js/renderMarkup';
import { Notify } from './js/notify';

let query = '';
let currentPage = 1;
let totalResults = null;
let numberPerPage = null;
let numberOfPages = null;

const refs = {
  form: document.querySelector('.search'),
  movies_list: document.querySelector('.movies_list'),
  paginator: document.querySelector('.paginator'),
};

const fetchTopMovies = async () => {
  try {
    const data = await fetchMovies();
    const fetchData = data.data.results;
    totalResults = data.data.total_results;
    numberPerPage = data.data.results.length;
    numberOfPages = data.data.total_pages;
    console.log(totalResults);

    console.log(data);
    Notify.addLoading();

    renderMarkup(fetchData, refs.movies_list);
    Notify.success(`Hooray! We found ${totalResults} images.`);
  } catch (error) {
    console.log(error);
    Notify.failure('Something went wrong');
  }
  Notify.removeLoading();
};

fetchTopMovies();

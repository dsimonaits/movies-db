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
renderPagination();

function renderPagination() {
  function accomodatePage(clickedPage) {
    if (clickedPage <= 1) {
      return clickedPage + 1;
    }
    if (clickedPage >= numberOfPages) {
      return clickedPage - 1;
    }
    return clickedPage;
  }

  function buildPagination(clickedPage) {
    refs.paginator.innerHTML = '';
    const currPageNum = accomodatePage(clickedPage);
    if (numberOfPages >= 3) {
      for (let i = -1; i < 2; i++) {
        const markup = `<button class="btn btn-primary" value="${
          currPageNum + i
        }">${currPageNum + i}</button>`;
        refs.paginator.insertAdjacentHTML('beforeend', markup);
      }
    } else {
      for (let i = 0; i < numberOfPages; i++) {
        const markup = `<button class="btn btn-primary" value="${i + 1}">${
          i + 1
        }</button>`;
        refs.paginator.insertAdjacentHTML('beforeend', markup);
      }
    }
  }

  function buildPage(currPage) {
    const trimStart = (currPage - 1) * numberPerPage;
    const trimEnd = trimStart + numberPerPage;
    console.log(trimStart, trimEnd);
    // console.log(listArray.slice(trimStart, trimEnd));
    // $('.content').empty().append(listArray.slice(trimStart, trimEnd));
    // $('.grid-uniform').empty().append(listArray.slice(trimStart, trimEnd));
  }

  buildPage(1);
  buildPagination(currentPage);

  refs.paginator.addEventListener('click', function () {
    var clickedPage = parseInt($(this).val());
    buildPagination(clickedPage);
    console.log(`Page clicked on ${clickedPage}`);
    buildPage(clickedPage);
  });
}

function clearSearchContent() {
  refs.movies_list.innerHTML = '';
}

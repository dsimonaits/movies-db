import { fetchTop } from './js/fetch-top-movies';
import { renderMarkup } from './js/renderMarkup';
import { Notify } from './js/notify';

let query = '';

const refs = {
  form: document.querySelector('.search'),
  movies_list: document.querySelector('.movies_list'),
};

const fetchTopMovies = async () => {
  try {
    const data = await fetchTop();
    const fetchData = data.data;

    console.log(fetchData);
    Notify.addLoading();

    renderMarkup(fetchData.results, refs.movies_list);
    Notify.success(`Hooray! We found ${fetchData.totalResults} images.`);
  } catch (error) {
    console.log(error);
    Notify.failure('Something went wrong');
  }
  Notify.removeLoading();
};

fetchTopMovies();

// const onEntry = entries => {
//   entries.forEach(async entry => {
//     const totalImages = document.querySelectorAll('.photo-card').length;
//     if (totalImages < perPage) {
//       return;
//     }
//     if (entry.isIntersecting && query !== '') {
//       try {
//         if (totalImages >= maxPages) {
//           if (totalImages > perPage) {
//             Notify.info(
//               "We're sorry, but you've reached the end of search results."
//             );
//           }
//           observer.unobserve(refs.sentinel);
//           return;
//         }
//         Notify.addLoading();
//         const data = await fetchPixabay(query, page, perPage);
//         const fetchData = data.data;

//         lightbox.destroy();
//         Notify.removeLoading();
//         renderMarkup(fetchData.hits, refs.gallery);
//         lightbox = new SimpleLightbox('.gallery a', {
//           captionsData: 'alt',
//           captionDelay: 250,
//         }).refresh();
//         incrementPage();
//       } catch (error) {
//         console.log(error);
//         Notify.failure('Something went wrong');
//       }
//     }
//   });
// };

// function resetPage() {
//   page = 1;
// }

// function incrementPage() {
//   page += 1;
// }

function clearSearchContent() {
  refs.movies_list.innerHTML = '';
}
// const observer = new IntersectionObserver(onEntry, {
//   rootMargin: '200px',
// });

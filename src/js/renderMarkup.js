import { fetchGenre } from './fetch-genre';
export { renderMarkup };

async function renderMarkup(movies, querySelector) {
  const fetchGenres = await fetchGenre();
  const genresArray = fetchGenres.data.genres;
  const moviesMarkup = movies
    .map(({ poster_path, original_title, genre_ids, release_date }) => {
      const movieGenreArray = genresArray.filter(({ id, name }) => {
        if (genre_ids.includes(id)) {
          return name;
        }
      });
      console.log(movies);
      const movieGenre = movieGenreArray.map(genre => genre.name);
      return `  <li class="movies_list__item">
        <div class="movie_card">
          <img
            class="movie_card__image"
            src="https://image.tmdb.org/t/p/w500/${poster_path}"
            alt=""
          />
          <p class="movie_card__info movie_card__name">${original_title}</p>
          <p class="movie_card__info movie_card_ganre">${movieGenre.join(
            ', '
          )} | ${release_date.slice(0, 4)}</p>
        </div>
      </li>`;
    })
    .join('');
  querySelector.insertAdjacentHTML('beforeend', moviesMarkup);
}

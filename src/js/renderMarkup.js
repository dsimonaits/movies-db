export { renderMarkup };

function renderMarkup(movies, querySelector) {
  const imagesMarkup = movies
    .map(({ poster_path, original_title }) => {
      return `  <li class="movies_list__item">
        <div class="movie_card">
          <img
            class="movie_card__image"
            src="https://image.tmdb.org/t/p/w500/${poster_path}"
            alt=""
          />
          <p class="movie_card__info movie_card__name">${original_title}</p>
          <p class="movie_card__info movie_card_ganre">Drama, Action | 2020</p>
        </div>
      </li>`;
    })
    .join('');
  querySelector.insertAdjacentHTML('beforeend', imagesMarkup);
}

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&year=2023";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?query=";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjY5ZjAyZDMxZmRiMjRiY2NlZDBlMGZlMzZlYThmYyIsInN1YiI6IjY0YzhjN2Q2Zjc5NGFkMDBhZDA1N2ZmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vqPJoxtTIyLgOmm5v9cVF8QVgjeJh2Hx0ZZV6sAaIEY",
  },
};
const main = document.querySelector("#main");
const form = document.querySelector("form");
const search = document.querySelector("#search");

//get movies
getMovies(API_URL);

async function getMovies(api) {
  const data = await fetch(api, options);
  const res = await data.json();
  showMovies(res.results);
}

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieElm = document.createElement("div");

    movieElm.classList.add("movie");

    movieElm.innerHTML = `
     <img src="${IMG_PATH + poster_path}" alt="${title}" />
    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="movie-overview">
      <h3>overview</h3>
    ${overview}
    </div>
  `;
    main.appendChild(movieElm);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});

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
const form = document.querySelector("form");
const search = document.querySelector("#search");

//get movies
getMovies(API_URL);

async function getMovies(api) {
  const data = await fetch(api, options);
  const res = await data.json();
  console.log(res.results);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const serchTerm = search.value;
  if (serchTerm && serchTerm != "") {
    getMovies(SEARCH_API + serchTerm);
  } else {
    window.location.reload();
  }
});

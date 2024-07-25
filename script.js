// Importando as configurações da API do arquivo config.js
const API_KEY = config.API_KEY;
const BASE_URL = config.BASE_URL;
const IMG_URL = config.IMG_URL;
const language = config.language;

//selecionando os elementos do Html que serão usados
const movieInfo = document.querySelector("#movie-info");
const moviePoster = document.querySelector(".movie-poster");
const movieTitle = document.querySelector(".movie-title");
const movieDescription = document.querySelector(".movie-description");
const getRandomMovieButton = document.querySelector("#btnDeMudar");
const anoFilme = document.querySelector("#anoDoFilme");
const generoFilme = document.querySelector("#generoDoFilme");
const duracaoFilme = document.querySelector("#duracaoDoFilme");

//Função que irá inserir todos os dados da api no frontend
getRandomMovieButton.addEventListener("click", async function gerar() {
  const randomId = Math.floor(Math.random() * 500);
  const movie = await fetch(
    `${BASE_URL}${randomId}?api_key=${API_KEY}&${language}`
  );
  const movieData = await movie.json();

  if (movieData.success == false) {
    gerar();
  } else {
    moviePoster.src = `${IMG_URL}${movieData.poster_path}`;
    movieTitle.textContent = movieData.title;
    movieDescription.textContent = movieData.overview;
    movieInfo.style.display = "flex";
    anoFilme.textContent = movieData.release_date.slice(0, 4);
    generoFilme.textContent = movieData.genres
      .map((genre) => genre.name)
      .join(", ");

    // Pegar a duração do filme e transformar para o formato "H e Min"
    duracaoFilme.textContent = movieData.runtime;
    const hours = Math.floor(movieData.runtime / 60);
    const minutes = movieData.runtime % 60;
    duracaoFilme.textContent = `${hours}h ${minutes}min`;
  }
});

const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=dd132df044d85760fdd79f3192642f6a'

const IMGPATH = 'https://image.tmdb.org/t/p/w1280'

const moviesContainer = document.querySelector('.movies-container');

async function getMovies(){
  const response = await fetch(APIURL)
  const data = await response.json();
  console.log(data);

  data.results.forEach(movie => {

    const {poster_path, title, vote_average} = movie;

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie')
    movieEl.innerHTML = `
    <img src="${IMGPATH + poster_path}">
    <div class="movie-info">
     <h3>${title}</h3>
     <span>${vote_average}</span>
    </div>
    `

   moviesContainer.appendChild(movieEl)

  })

  return data
} 

getMovies();
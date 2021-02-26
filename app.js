const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=dd132df044d85760fdd79f3192642f6a'

const IMGPATH = 'https://image.tmdb.org/t/p/w1280'
const DETAILS = 'https://api.themoviedb.org/3/movie/3?api_key=dd132df044d85760fdd79f3192642f6a&language=en-US'
const CAST = 'https://api.themoviedb.org/3/movie/3/credits?api_key=dd132df044d85760fdd79f3192642f6a&language=en-US'

const moviesContainer = document.querySelector('.movies-container')
const singleMovie = document.querySelector('.single-movie')
const casts = document.querySelector('.cast');


async function getMovies(url){
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

getMovies(APIURL)
  .then(data => {
    showMovies(data)
    getButtons()
  })
  .catch(err => console.log(err))




//SHOW MOVIES
function showMovies(data){
  moviesContainer.innerHTML = '' 
  let output = '';
  console.log(data)

  data.results.forEach(movie => {
    output += `
    <div class="movie">
      <img src=${IMGPATH + movie.poster_path} alt="">
      <div class="movie-content">
        <h3>${movie.title}</h3>
        <p>${movie.vote_average}</p>
      </div>
      <a href="#" data-id=${movie.id}  class="btn">Show more</a>
    </div>
    `
    moviesContainer.innerHTML = output;
  })
}

function getButtons(){
  const buttons = [...document.querySelectorAll('.btn')]
  
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault()
      const id = button.dataset.id;
      // console.log(id)

      async function getSingleMovie(id){
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=dd132df044d85760fdd79f3192642f6a&language=en-US`)
        const data = await response.json();
        return data;
      }

      getSingleMovie(id)
        .then(data => {
          displaySingleMovie(data)
          displayCast(id)
        })
        .catch(err => console.log(err))
    })
  })
}

//DISPLAY CAST
async function displayCast(id){
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=dd132df044d85760fdd79f3192642f6a&language=en-US`)
  const result = await response.json();
  const cast = result.cast;
  console.log(cast)

  let output = ''

  cast.map(cast => {
    output += `
    <img src=${IMGPATH + cast.profile_path} alt="">
    <h3>${cast.character}</h3>
    <h3>${cast.name}</h3>
    `
  })
  casts.innerHTML = output;
}



//Display single movie 
function displaySingleMovie(data){
  console.log(data)
  const{overview, backdrop_path} = data;

  moviesContainer.innerHTML = '';

  let output = `
    <img src=${IMGPATH + backdrop_path} alt="">
    <div class="content">
      <h2>Summary</h2>
      <p>${overview}</p>
    </div>
  `
 singleMovie.innerHTML = output;
}






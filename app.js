const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=dd132df044d85760fdd79f3192642f6a'

const IMGPATH = 'https://image.tmdb.org/t/p/w1280'
const DETAILS = 'https://api.themoviedb.org/3/movie/3?api_key=dd132df044d85760fdd79f3192642f6a&language=en-US'
const CAST = 'https://api.themoviedb.org/3/movie/3/credits?api_key=dd132df044d85760fdd79f3192642f6a&language=en-US'
const VIDEO = 'https://api.themoviedb.org/3/movie/3/videos?api_key=dd132df044d85760fdd79f3192642f6a&language=en-US'
const LINK = 'https://www.youtube.com/watch?v='
const SEARCHMOVIE = 'https://api.themoviedb.org/3/search/movie?api_key=dd132df044d85760fdd79f3192642f6a&query='

const moviesContainer = document.querySelector('.movies-container');
const singleMovie = document.querySelector('.single-movie');
const casts = document.querySelector('.cast');
const trailer = document.querySelector('.trailer');
const singleMovieContainer = document.querySelector('.single-movie-container');
const form = document.querySelector('#form');
const input = document.querySelector('#search');



singleMovieContainer.style.display = 'none'

// singleMovieContainer.innerHTML = ''
 
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


      async function getVideo(id){
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=dd132df044d85760fdd79f3192642f6a&language=en-US`)
        const data = await response.json();
        const video = data.results[0];
        // console.log(video)

        const key = video.key;

        const heading = document.createElement('h2')
        heading.textContent = 'TRAILER'
        heading.className = 'trailer-heading'
        
        const output = createIframe(key)
        // console.log(output);
        trailer.appendChild(heading);
        trailer.appendChild(output);
        
      }

      getSingleMovie(id)
        .then(data => {
          displaySingleMovie(data)
          getBackBtn()
          displayCast(id)
          getVideo(id)
        })
        .catch(err => console.log(err))
    })
  })
}

//GET BACK BTN
function getBackBtn(){
  const btn = document.querySelector('.backBtn')
  btn.addEventListener('click', () => {
    window.location.reload()
  })
}


//DISPLAY CAST
async function displayCast(id){
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=dd132df044d85760fdd79f3192642f6a&language=en-US`)
  const result = await response.json();
  const cast = result.cast.slice(0, 5);

  let output = ''

  cast.map(cast => {
    output += `
    <div class="cast-container">
      <div class="cast-item">
        <div>
          <img src=${IMGPATH + cast.profile_path} alt="">
        </div>
        <div class="names">
          <h4 class="character">Character: ${cast.character}</h4>
          <h3 class="actor">Actor: ${cast.name}</h3>
        </div>
      </div>
    </div>
    `
  })
  casts.innerHTML = output;
}



//Display single movie 
function displaySingleMovie(data){
  const navbar = document.querySelector('.navbar');
  navbar.style.display = 'none';
  // console.log(data)
  const{overview, backdrop_path} = data;

  moviesContainer.innerHTML = '';

  let output = `
    <img src=${IMGPATH + backdrop_path} alt="">
    <span class="backBtn">
      <i class="fas fa-angle-left fa-2x"></i>
    </span>
    <div class="content">
      <h2 class="summary">Summary</h2>
      <p class="overview">${overview}</p>
      <h2 class="cast-heading">CAST</h2>
    </div>
  `
 singleMovie.innerHTML = output;
 singleMovieContainer.style.display = 'block';
}


//I FRAME FUNCTION
function createIframe(key){
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${key}`;
  // iframe.width = 1000;
  // iframe.height = 400;
  iframe.allowFullscreen = true;
  return iframe
}

//SEARCH SINGLE MOVIE
async function searchMovie(url){
  const response = await fetch(url);
  const data = await response.json();
  return data;
}


//SEARCH MOVIE
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // trailer.innerHTML = ''

  const searchTerm = input.value;
  
  searchMovie(SEARCHMOVIE + searchTerm)
    .then(data => {
      showMovies(data)
      setRule(data)
      getButtons()
      input.value = '';
    });
})


//FUNCTION SET RULE
function setRule(data){
  const items = data.results;
  console.log(items);
  const da = items.filter(item => item.poster_path !== null)

    let output = ''

    da.map(item => {
    output += `
    <div class="movie">
      <img src=${IMGPATH + item.poster_path} alt="">
      <div class="item-content add">
        <h3 class="form-title">${item.title}</h3>
        <p class="form-average">${item.vote_average}</p>
      </div>
      <a href="#" data-id=${item.id}  class="btn">Show more</a>
    </div>
    `
    moviesContainer.innerHTML = output;
  }) 
}








 






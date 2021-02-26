const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=dd132df044d85760fdd79f3192642f6a'

const IMGPATH = 'https://image.tmdb.org/t/p/w1280'
const DETAILS = 'https://api.themoviedb.org/3/movie/3?api_key=dd132df044d85760fdd79f3192642f6a&language=en-US'
const CAST = 'https://api.themoviedb.org/3/movie/3/credits?api_key=dd132df044d85760fdd79f3192642f6a&language=en-US'

const moviesContainer = document.querySelector('.movies-container')


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
  let output = '';
  console.log(data)

  data.results.forEach(movie => {
    output += `
    <div class="movie" data-id={movie.id}>
      <img src=${IMGPATH + movie.poster_path} alt="">
      <div class="movie-content">
        <h3>${movie.title}</h3>
        <p>${movie.vote_average}</p>
      </div>
      <a href="#" class="btn">Show more</a>
    </div>
    `
    moviesContainer.innerHTML = output;
  })
}

function getButtons(){
  const buttons = [...document.querySelectorAll('.btn')]
  
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('clicked')
    })
  })
}







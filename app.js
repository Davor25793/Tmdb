const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=dd132df044d85760fdd79f3192642f6a'

const IMGPATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?api_key=dd132df044d85760fdd79f3192642f6a&query='

const moviesContainer = document.querySelector('.movies-container');


const search = document.querySelector('#search')

async function getMovies(url){
  const response = await fetch(url)
  const data = await response.json();
  console.log(data)

  showMovies(data.results);

} 

getMovies(APIURL);


function showMovies(movies){

  moviesContainer.innerHTML = ''

  movies.forEach(movie => {


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
}

const form = document.querySelector('#form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

 const searchTerm = search.value;

  if(searchTerm){
    getMovies(SEARCHAPI + searchTerm)
    search.value = ''
  }
})


/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const getMovies = require('./getMovies.js');

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
      document.getElementById("movie-list").innerHTML +=`<li>id#${id} - ${title} - rating: ${rating}</li>`
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

function movieList() {
    document.getElementById("movie-list").innerHtml =`id#${id} - ${title} - rating: ${rating}`
};
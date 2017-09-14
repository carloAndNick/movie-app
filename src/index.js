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
    document.getElementById("loading").innerHTML = 'Here are all the movies:'
    movies.forEach(({title, rating}) => {
        addMovieToHtml(title, rating)
    });
}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.')
    console.log(error);
});

//this is the event function for clicking the add movie button
//to add stuff to the JSON file/database, we needed the headers and the body.
//in the body property the JSON.stringify() is REQUIRED!
//the data inside the stringify MUST BE an OBJECT
function addAMovie(){
    let movieTitle= document.getElementById("title").value;
    let movieRating= document.getElementById("rating").value;
    let header= new Headers({
        'Content-Type': 'application/json'
    });
    let movieObj = {title:movieTitle,rating:movieRating};
    console.log(movieObj);
    let fetchOptions = {
        method: "POST",
        body: JSON.stringify(movieObj),
        headers: header
    };
    document.getElementById("title").value = "";
    document.getElementById("rating").value = "1";
    fetch("/api/movies", fetchOptions)
        .then((response)=>console.log(response.json()));
    addMovieToHtml(movieTitle, movieRating)

}
//event listener for button
document.getElementById("button").addEventListener("click", addAMovie);

//function to add movies to the html
function addMovieToHtml( title, rating){
    document.getElementById("movie-list").innerHTML +=`<li>${title} - rating: ${rating}</li>`
}

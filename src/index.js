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
function addAMovie(){
    let movieTitle= document.getElementById("title").value;
    let movieRating= document.getElementById("rating").value;
    console.log(movieTitle);
    console.log(movieRating);
    addMovieToHtml(movieTitle, movieRating)
    // let movieObj = "{'title':'movieTitle','rating': 'movieRating'}";
    // // let parsedMovieObj =JSON.parse(movieObj)
    // let fetchOptions = {
    //     method: "POST",
    //     body: movieObj,
    // };
    // fetch("/api/movies", fetchOptions)
    //     .then((response)=>console.log(response.json))
}
//event listener for button
document.getElementById("button").addEventListener("click", addAMovie);

//function to add movies to the html
function addMovieToHtml( title, rating){
    document.getElementById("movie-list").innerHTML +=`<li>${title} - rating: ${rating}</li>`
}

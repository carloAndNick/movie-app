/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const getMovies = require('./getMovies.js');
// document.getElementById("edit-form").setAttribute("hidden", "true");

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
//function to add movies to the edit fields
function addMovieToEdit(title, id){
    document.getElementById("edit-movie").innerHTML +=`<option value=${id}>${title}</option>`
}
console.log(document.getElementById("edit-movie").innerHTML);

//event handler for edit button
function editButton() {
    unHide("edit-form");
    unHide("edit-this-movie");
    getMovies().then((movies) => {
        console.log('Editing movies...');
        movies.forEach(({title, id}) => {
            addMovieToEdit(title, id)
        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
}
//event listener for making edit list appear
document.getElementById("edit-button").addEventListener("click", editButton);


//event handler for edit this movie button
function editThisMovie(){
    unHide("edit-submit-form");
    let movieToEditIndex= (document.getElementById("edit-movie").value)-1;
    console.log(movieToEditIndex);
    getMovies().then((movies)=>{
        console.log(movies[movieToEditIndex]);
        let movieToEditTitle = movies[movieToEditIndex].title;
        let movieToEditRating = movies[movieToEditIndex].rating;
        document.getElementById("edit-title").value = movieToEditTitle;
        document.getElementById("edit-rating").value = movieToEditRating

    })


}
//event listener for submit form
document.getElementById("edit-this-movie").addEventListener("click", editThisMovie);


//function to unhide things. the element id should be in the form of a string
function unHide(elementId) {
    document.getElementById(elementId).setAttribute("hidden", "false");
    document.getElementById(elementId).style.display = "inline";
}
function reHide(elementId){
    document.getElementById(elementId).setAttribute("hidden", "true");
    document.getElementById(elementId).style.display = "none";
}
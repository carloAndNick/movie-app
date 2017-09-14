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
function displayAllMovies() {
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
}
displayAllMovies();
const header= new Headers({
    'Accept':'application/json',
    'Content-Type': 'application/json'
});

//this is the event function for clicking the add movie button
//to add stuff to the JSON file/database, we needed the headers and the body.
//in the body property the JSON.stringify() is REQUIRED!
//the data inside the stringify MUST BE an OBJECT
function addAMovie(){
    let movieTitle= document.getElementById("title").value;
    let movieRating= document.getElementById("rating").value;

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
    reHide("movie-list-container");
    reHide("new-movie-form");
    reHide("edit-button");
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
    reHide("edit-form");
    reHide("edit-this-movie");
    unHide("edit-submit-form");
    let movieToEditId= (document.getElementById("edit-movie").value);
    let movieToEditIndex= movieToEditId-1;
    console.log(movieToEditIndex);
    getMovies().then((movies)=>{
        console.log(movies[movieToEditIndex]);
        let movieToEditTitle = movies[movieToEditIndex].title;
        let movieToEditRating = movies[movieToEditIndex].rating;
        document.getElementById("edit-title").value = movieToEditTitle;
        document.getElementById("edit-rating").value = movieToEditRating

    });

}
//event listener for submit form
document.getElementById("edit-this-movie").addEventListener("click", editThisMovie);

//button to submit edits
function submitEdit(){
    let editedMovieTitle = document.getElementById("edit-title").value;
    let editedMovieRating = document.getElementById("edit-rating").value;
    let movieToEditId = document.getElementById("edit-movie").value;
    let editedMovieObj = {title:editedMovieTitle,rating:editedMovieRating,id:movieToEditId};
    console.log(editedMovieObj);
    let fetchOptions = {
        method: "PUT",
        body: JSON.stringify(editedMovieObj),
        headers: header
    };
    fetch(`/api/movies/${movieToEditId}`,fetchOptions).then(()=>{
        document.getElementById("movie-list").innerHTML = "";
       unHide("movie-list-container");
        reHide("edit-submit-form");
        unHide("new-movie-form");
        unHide("edit-button")
    }).then(()=>{displayAllMovies()});

}

//event listener for submitting edits
document.getElementById("confirm-edit-button").addEventListener("click", submitEdit);


//function to unhide things. the element id should be in the form of a string
function unHide(elementId) {
    document.getElementById(elementId).setAttribute("hidden", "false");
    document.getElementById(elementId).style.display = "initial";
}
function reHide(elementId){
    document.getElementById(elementId).setAttribute("hidden", "true");
    document.getElementById(elementId).style.display = "none";
}


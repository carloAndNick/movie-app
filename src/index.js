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
    document.getElementById("movie-list").innerHTML = "";
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
    if(movieTitle === ""){
        alert("its empty")
    } else {


        let movieObj = {title: movieTitle, rating: movieRating};
        console.log(movieObj);
        let fetchOptions = {
            method: "POST",
            body: JSON.stringify(movieObj),
            headers: header
        };
        document.getElementById("title").value = "";
        document.getElementById("rating").value = "1";
        fetch("/api/movies", fetchOptions)
            .then((response) => console.log(response.json()));
        addMovieToHtml(movieTitle, movieRating);
        changeAddMovie();
        setTimeout(changeHelloAgain, 2000)

    }
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

//function to add movies to the delete fields
function addMovieToDelete(title, id){
    document.getElementById("delete-movie").innerHTML +=`<option value=${id}>${title}</option>`
}

//event handler for edit button
function editButton() {
    reHide("delete-a-movie");
    reHide("movie-list-container");
    reHide("new-movie-form");
    reHide("edit-button");
    unHide("edit-form");
    unHide("edit-this-movie");
    unHide("cancel-button");
    getMovies().then((movies) => {
        console.log('Editing movies...');
        document.getElementById("edit-movie").innerHTML = "";
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
    unHide("edit-another");
    reHide("edit-form");
    reHide("edit-this-movie");
    unHide("edit-submit-form");
    let movieToEditId= (document.getElementById("edit-movie").value);
    let movieToEditIndex= movieToEditId-1;
    console.log(movieToEditIndex);
    getMovies(movieToEditId).then((movies)=>{
        console.log(movies);
        let movieToEditTitle = movies.title;
        let movieToEditRating = movies.rating;
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
        unHide("edit-button");
        unHide("delete-a-movie");
        reHide("cancel-button");
        reHide("edit-another");

    }).then(()=>{displayAllMovies()});

}

//event listener for submitting edits
document.getElementById("confirm-edit-button").addEventListener("click", submitEdit);
document.getElementById("confirm-edit-button").addEventListener("click", function(){
    movieEdited();
    setInterval(changeHelloAgain, 1000)
});


//event handler for edit a different movie button
function editADifferentMovie(){
    reHide("edit-another");
    unHide("edit-form");
    unHide("edit-this-movie");
    reHide("edit-submit-form");

}

//event listener for Edit a Different Movie Button
document.getElementById("edit-another").addEventListener("click", editADifferentMovie);

//event handler for opening delete dialog
function deleteDialogButton() {
    reHide("delete-a-movie");
    reHide("movie-list-container");
    reHide("new-movie-form");
    reHide("edit-button");
    unHide("delete-form");
    unHide("delete-this-movie");
    unHide("cancel-button");
    getMovies().then((movies) => {
        console.log('Deleting a movie...');
        document.getElementById("delete-movie").innerHTML = "";
        movies.forEach(({title, id}) => {
            addMovieToDelete(title, id)
        });
    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);
    });
    changeDeleteMovie()
}
//event listener for delete a movie button
document.getElementById("delete-a-movie").addEventListener("click", deleteDialogButton);

//event handler
function deleteButton(){
    let movieToDeleteId = document.getElementById("delete-movie").value;
    let fetchOptions = {
        method: "DELETE",
        headers: header
    };
    fetch(`/api/movies/${movieToDeleteId}`,fetchOptions).then(()=>{
        document.getElementById("movie-list").innerHTML = "";
        unHide("movie-list-container");
        reHide("delete-form");
        unHide("new-movie-form");
        unHide("delete-a-movie");
        unHide("edit-button");
        reHide("cancel-button")
    })
        .then(()=>{displayAllMovies()})
        // .then(()=>changeHelloAgain());
}

//event listener for delete movie
document.getElementById("delete-this-movie").addEventListener("click", deleteButton);
document.getElementById("delete-this-movie").addEventListener("click", function(){
    movieDeleted();
    setInterval(changeHelloAgain, 1000)
});


//event handler for cancel button
function cancelButton(){
unHide("movie-list-container");
    reHide("delete-form");
    unHide("new-movie-form");
    unHide("delete-a-movie");
    unHide("edit-button");
reHide("cancel-button");
reHide("edit-form");
reHide("edit-submit-form");
reHide("edit-another");
    changeHelloAgain()
}


//event listener for cancel button
document.getElementById("cancel-button").addEventListener("click",cancelButton);


//function to unhide things. the element id should be in the form of a string
function unHide(elementId) {
    document.getElementById(elementId).removeAttribute("hidden");
    document.getElementById(elementId).style.display = "initial";
}
function reHide(elementId){
    document.getElementById(elementId).setAttribute("hidden", "true");
    document.getElementById(elementId).style.display = "none";
}
//change title to edit a movie
function changeEditMovie() {
    document.getElementById("heading").innerHTML = "Edit A Movie"

}


document.getElementById("edit-button").addEventListener("click",changeEditMovie);

function changeDeleteMovie() {
    document.getElementById("heading").innerHTML = "Delete A Movie"

}
// document.getElementById("delete-a-movie").addEventListener("click",changeDeleteMovie);

function changeAddMovie() {
    document.getElementById("heading").innerHTML = "Added a Movie"

}
function movieEdited(){
    document.getElementById("heading").innerHTML = "Movie Edited!"
}


function changeHelloAgain(){
    document.getElementById("heading").innerHTML ="Hello There!"
}
function movieDeleted(){
    document.getElementById("heading").innerHTML ="Movie Deleted!"
}

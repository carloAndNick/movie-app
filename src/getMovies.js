const getMovies = (id) => {
  if(id=== undefined){
      return fetch(`/api/movies/`)
          .then(response => response.json());
  }else {
      return fetch(`/api/movies/${id}`)
          .then(response => response.json());
  }
};

module.exports = getMovies;

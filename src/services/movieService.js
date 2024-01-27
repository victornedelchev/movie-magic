const Movie = require('../models/Movie');

exports.getAll = () => Movie.find();

exports.getOne = (movieId) => {
   const movie = Movie.findById(movieId);
   
   return movie;
}; 

// TODO: fIlter result in mongoDB
exports.search = async (title, genre, year) => {
    let result = await Movie.find().lean();

    if (title) {
        result = result.filter(movie => movie.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()));
    }

    if (genre) {
        result = result.filter(movie => movie.genre.toLocaleLowerCase().includes(genre.toLocaleLowerCase()));
    }

    if (year) {
        result = result.filter(movie => movie.year === year);
    }

    return result;
};

exports.create = (movieData) => Movie.create(movieData);

  
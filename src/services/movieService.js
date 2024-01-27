const Movie = require('../models/Movie');

exports.getAll = () => Movie.find();

exports.getOne = (movieId) => Movie.findById(movieId);


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

exports.attach = async (movieId, castId) => {
    const movie = await this.getOne(movieId);

    // TODO: validate castId if exist
    // TODO: Validate is cast already added
    movie.casts.push(castId);

    return movie.save();
    // return Movie.findByIdAndUpdate(movieId, {
    //     $push: {
    //         casts: castId
    //     }
    // });
};
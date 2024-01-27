const Movie = require('../models/Movie');
const Cast = require('../models/Cast');

exports.getAll = () => Movie.find();

exports.getOne = (movieId) => Movie.findById(movieId).populate('casts');


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
    // This is optional and we don't need it this case
    // const cast = await Cast.findById(castId);
    // cast.movies.push(movie);
    // await cast.save();

    // TODO: validate castId if exist
    // TODO: Validate is cast already added
    movie.casts.push(cast);

    await movie.save();

    return movie;
    // return Movie.findByIdAndUpdate(movieId, {
    //     $push: {
    //         casts: castId
    //     }
    // });
};
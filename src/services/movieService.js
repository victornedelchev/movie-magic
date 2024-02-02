const Movie = require("../models/Movie");
const Cast = require("../models/Cast");

exports.getAll = () => Movie.find();

exports.getOne = (movieId) => Movie.findById(movieId).populate("casts");

// TODO: fIlter result in mongoDB
exports.search = (title, genre, year) => {
  let query = {};
  let query2 = Movie.find({});

  if (title) {
    // query.title = new RegExp(title, "i");
    query2 = query2.find({ title: new RegExp(title, "i") });
  }

  if (genre) {
    // query.genre = genre.toLowerCase();
    query2 = query2.find({ genre: genre.toLowerCase() });
  }

  if (year) {
    // query.year = year;
    query2 = query2.find({ year });
  }

  // return Movie.find(query);
  return query2;
};

exports.create = (movieData) => Movie.create(movieData);

exports.edit = (movieId, movieData) => Movie.findByIdAndUpdate(movieId, movieData);

exports.attach = async (movieId, castId) => {
  const movie = await this.getOne(movieId);
  // This is optional and we don't need it this case
  const cast = await Cast.findById(castId);
  // cast.movies.push(movie);
  await cast.save();

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

exports.delete = (movieId) => Movie.findByIdAndDelete(movieId);
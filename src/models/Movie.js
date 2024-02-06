const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        minLength: [5, 'Title mist be at least 5 characters long!'],
        match: [/^[A-Za-z0-9\s]+$/g, 'Title could be English letters, digits, and white spaces!'],
    },
    genre: {
        type: String,
        required: [true, 'Genre is required!'],
        lowercase: true,
        minLength: [5, 'Genre mist be at least 5 characters long!'],
        match: [/^[A-Za-z0-9\s]+$/g, 'Title could be English letters, digits, and white spaces!'],
    },
    director:  {
        type: String,
        required: [true, 'Director is required!'],
        minLength: [5, 'Director mist be at least 5 characters long!'],
        match: [/^[A-Za-z0-9\s]+$/g, 'Director could be English letters, digits, and white spaces!'],
    },
    year: {
        type: Number,
        required: [true, 'Year is required!'],
        min: 1900,
        max: 2024,
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required!'],
        min: 1,
        max: 5,
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        manLength: 20,
        match: [/^[A-Za-z0-9\s]+$/g, 'Description could be English letters, digits, and white spaces!'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required!'],
        match: [/^https?:\/\//, 'Image URL starts with http://... or https://...!'],
    },
    casts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Cast',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
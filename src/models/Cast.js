const mongoose = require('mongoose');

const castSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [5, 'Name mist be at least 5 characters long!'],
    },
    age: {
        type: Number,
        required:[true, 'Age is required!'],
        min: [1, 'Age must be between 1 - 120!'],
        max: [120, 'Age must be between 1 - 120!'],
    },
    born: {
        type: String,
        required: [true, 'Born is required!'],
        minLength: [10, 'Born mist be at least 10 characters long!'],
        match: [/^[A-Za-z0-9\s]+$/g, 'Born could be English letters, digits, and white spaces!'],
    },
    nameInMovie: {
        type: String,
        required: [true, 'Name in movie is required!'],
        minLength: [5, 'Name in movie mist be at least 5 characters long!'],
        match: [/^[A-Za-z0-9\s]+$/g, 'Title could be English letters, digits, and white spaces!'],
    },
    castImage: {
        type: String,
        required: true,
        validate: {
            validator(value) {
                return /^https?:\/\//.test(value);
            },
            message: (props) => `${props.value} is invalid url for the cast image`
        }
    },
    // movies: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Movie'
    // }]
});

const Cast = mongoose.model('Cast', castSchema);

module.exports = Cast;
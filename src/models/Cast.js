const mongoose = require('mongoose');

const castSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 5,
        max: 120
    },
    born: {
        type: String,
        required: true
    },
    nameInMovie: {
        type: String,
        required: true
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
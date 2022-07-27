var mongoose = require('mongoose')

var Schema = mongoose.Schema

var GenreShema = new Schema({
    name: {type: String, require: true, minLength: 3, maxLength: 100}
})

GenreShema
.virtual('url')
.get(function(){
    return '/catalog/genre/' + this._id;
})

module.exports = mongoose.model('Genre', GenreShema)
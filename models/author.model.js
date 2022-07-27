var mongoose = require('mongoose')

var Schema = mongoose.Schema

var AuthorSchema = new Schema({
    first_name: {type: String, required: true, maxLength: 100},
    family_name: {type: String, required: true, maxLength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
});

//vitrual for author name

AuthorSchema
.virtual('name')
.get(function(){
    // handle cases where author does not have first , family name
    var fullName = '';
    if (this.first_name && this.family_name) {
        fullName = `${this.first_name},${this.family_name}`
    }

    if (!this.first_name || !this.family_name){
        fullName = ''
    }
    return fullName
})

// virtual for author lifespan

AuthorSchema.virtual('lifespan').get(function() {
    var lifetime_string = '';
    if (this.date_of_birth) {
      lifetime_string = this.date_of_birth.getYear().toString();
    }
    lifetime_string += ' - ';
    if (this.date_of_death) {
      lifetime_string += this.date_of_death.getYear()
    }
    return lifetime_string;
  });
  
  // Virtual for author's URL
  AuthorSchema
  .virtual('url')
  .get(function () {
    return '/catalog/author/' + this._id;
  });

  module.exports = mongoose.model('Author', AuthorSchema);


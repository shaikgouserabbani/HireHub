let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');
let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }
});

userSchema.plugin(passportLocalMongoose);
let user = mongoose.model('user',userSchema);
module.exports = user;
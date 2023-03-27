let mongoose = require('mongoose');
let notiSchema = new mongoose.Schema({
    body: String,
    author: String,
})

let Notifications = mongoose.model('Notifications',notiSchema);
module.exports = Notifications;
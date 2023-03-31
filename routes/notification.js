let express = require('express');
let router = express.Router();


let Notifications = require('../models/noti_DB');

let {isLoggedin, isAdmin} = require('../middlewares/index.js');

router.get('/notifications', async function(req, res) {
    try {
        let allnotifs = await Notifications.find({});
        res.render('index-notif.ejs',{allnotifs});
    } catch (error) {
        console.error(error);
        
    }
});

router.get('/notifications/new', function(req, res){
    res.render('new-notif.ejs');

});

router.post('/notifications', async function(req, res) {
    try {
        let notif = new Notifications({
            body:req.body.body,
            author: req.body.author,
        });
        await notif.save();
        res.redirect('/notifications');

    } catch (error) {
        console.error(error);
    }
});

router.delete('/notifications/:id', isLoggedin ,isAdmin , async function(req, res) {
    Notifications.findByIdAndDelete(req.params.id);
    res.redirect('/notifications');
});

module.exports = router;
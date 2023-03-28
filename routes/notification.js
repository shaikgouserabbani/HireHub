let express = require('express');
let router = express.Router();


let Notifications = require('../models/noti_DB');

router.get('/notification', async function(req, res) {
    try {
        let allnotifs = await Notifications.find({});
        res.render('index-notif.ejs',{allnotifs});
    } catch (error) {
        console.error(error);
        
    }
});

router.get('/notification/new', function(req, res){
    res.render('new-notif.ejs');

});

router.post('/notification', async function(req, res) {
    try {
        let notif = new Notifications({
            body:req.body.body,
            author: req.body.author,
        });
        await notif.save();
        res.redirect('/notification');

    } catch (error) {
        console.error(error);
    }
});

router.delete('/notification/:id', async function(req, res) {
    Notifications.findByIdAndDelete(req.params.id);
    res.redirect('/notification');
});

module.exports = router;
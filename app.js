let express = require('express');
let mongoose = require ('mongoose');
let methodOverride = require('method-override');
let app = express();
let session = require('express-session');
let passport = require('passport');
let localStrategy = require('passport-local');

mongoose.connect('mongodb+srv://skrab3006:gouse@hirehub.ryfgnh2.mongodb.net/?retryWrites=true&w=majority') 
    .then(function (){
        console.log('connected to database');
    })
    .catch(function(err)  {
        console.log(err);
    });
app.use(session({
    secret: 'SupersecretPassword',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure:true,
        expires:Date.now()+1000*60*60*24,
        maxAge: 1000* 60* 60 * 24
    }
 })
);

let User = require('./models/user_DB');
// passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set('view engine','ejs');
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname +'/public'));
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

let jobRoutes = require('./routes/jobs.js');
let notiRoutes = require('./routes/notification.js');
let authRoutes = require('./routes/auth');
let userRoutes = require('./routes/user');
let questionRoutes = require('./routes/question');


app.use (jobRoutes);
app.use (notiRoutes);
app.use (authRoutes);
app.use(userRoutes);
app.use(questionRoutes);



app.listen(3001,()=>{
    console.log('server running on port 3001');
});
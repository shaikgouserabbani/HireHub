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

let jobRoutes = require('./routes/jobs.js');
app.use (jobRoutes);
let notiRoutes = require('./routes/notification.js');
app.use (notiRoutes);
let authRoutes = require('./routes/auth');
app.use (authRoutes);

app.get('/jobs',(req,res)=>{
    res.send('landing page');
});

app.listen(3001,()=>{
    console.log('server running on port 3001');
});
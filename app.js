let express = require('express');
let mongoose = require ('mongoose');
let methodOverride = require('method-override');
let app = express();

mongoose.connect('mongodb+srv://skrab3006:gouse@hirehub.ryfgnh2.mongodb.net/?retryWrites=true&w=majority') 
    .then(function (){
        console.log('connected to database');
    })
    .catch(function(err)  {
        console.log(err);
    });

app.set('view engine','ejs');
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname +'/public'));

let jobRoutes = require('./routes/jobs.js');
app.use (jobRoutes);
let notiRoutes = require('./routes/notification.js');
app.use (notiRoutes);


app.get('/jobs',(req,res)=>{
    res.send('landing page');
});

app.listen(3001,()=>{
    console.log('server running on port 3001');
});
let express = require('express');
let router = express.Router();

let Job = require ('../models/job_DB.js')
 
router.get('/',(req,res) => {
    res.render('landing');
});

//index
router.get('/jobs', async (req,res) => {
    try {
        let foundJobs = await Job.find({});
        res.render('index',{foundJobs});
    } catch (error) {
        console.log("error");
        
    }
});

//new
router.get('/jobs/new',(req,res) => {
    res.render('new');
});

//create
router.post('/jobs', async (req,res) => {
    try {
        let newJob = new Job({
            name: req.body.name,
            address: req.body.address,
            image: req.body.image,
            package: req.body.package ,  
            cgpa: req.body.cgpa,
            deadline: req.body.deadline,
            type: req.body.type

        });
            await newJob.save();
            res.redirect('/jobs');
    } catch (error) {
        console.log("error");
        
    }
});

//show
router.get('/jobs/:id', async (req,res) => {
    try {
        let id = req.params.id;
		let job = await Job.findById(id);
		res.render('show', { job });
        
    } catch (error) {
        console.log("error");
    }
});

//edit
router.get('/jobs/:id/:edit', async (req,res) => {
    try {
        let id = req.params.id;
		let job = await Job.findById(id);
		res.render('edit', { job });
        
    } catch (error) {
        console.log("error");
    }
});
//update
router.patch('/jobs/:id', async (req,res) => {
    let id = req.params.id;
    let updatedJob = {
        name: req.body.name,
        address: req.body.address,
        image: req.body.image,
        package: req.body.package,
        cgpa: req.body.cgpa,
        deadline: req.body.deadline,
        type: req.body.type

    }
    let job = await Job.findByIdAndUpdate(id,updatedJob);
    res.redirect(`/jobs/${id}`);
});

//delete
router.delete('/jobs/:id',async (req,res) => {
    let id = req.params.id;
    await Job.findByIdAndDelete(id);
    res.redirect('/jobs');
});

module.exports = router;
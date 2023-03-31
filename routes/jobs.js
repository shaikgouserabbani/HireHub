let express = require('express');
let router = express.Router();

let Job = require ('../models/job_DB.js')
let Notifications = require('../models/noti_DB');
const { authenticate } = require('passport');

let {isLoggedin, isAdmin} = require('../middlewares/index.js');

router.get('/',(req,res) => {
    res.render('landing');
});

//index
router.get('/jobs', async (req,res) => {
    try {
        let foundJobs = await Job.find({});
        console.log('req.user');
        res.render('index',{foundJobs});
    } catch (error) {
        console.log("error");
        
    }
});

//new
router.get('/jobs/new',isLoggedin, isAdmin,(req,res) => {
    res.render('new');
});

//create
router.post('/jobs',isLoggedin, isAdmin , async (req,res) => {
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
            let newnotif = new Notifications({
                body: 'A new job has been Posted',
                author: newJob.name

            });
            await newnotif.save();
            res.redirect('/jobs');
    } catch (error) {
        console.log('error while adding a new job',"error");
        
    }
});

//show
router.get('/jobs/:id', async (req,res) => {
    try {
        let id = req.params.id;
		let job = await Job.findById(id).populate('appliedUsers');
		res.render('show', { job });
        
    } catch (error) {
        console.log('error while fetching a job',"error");
    }
});

//edit
router.get('/jobs/:id/:edit',isLoggedin, isAdmin, async (req,res) => {
    try {
        let id = req.params.id;
		let job = await Job.findById(id);
		res.render('edit', { job });
        
    } catch (error) {
        console.log('error while fetching a job for edit form',"error");
    }
});
//update
router.patch('/jobs/:id', isLoggedin, isAdmin,async (req,res) => {
    try {
        let id = req.params.id;
    let updatedJob = {
        name: req.body.name,
        address: req.body.address,
        image: req.body.image,
        package: req.body.package,
        cgpa: req.body.cgpa,
        deadline: req.body.deadline,
        type: req.body.type
    };
    let job = await Job.findByIdAndUpdate(id,updatedJob);
    let newNotif = new Notification({
        body: 'A job has been updated',
        author: updatedJob.name
    });
    await newNotif.save();
    res.redirect(`/jobs/${id}`);
    } catch (error) {
        console.log('error while updating the job', error);
        
    }
});

//delete
router.delete('/jobs/:id', isLoggedin, isAdmin,async (req,res) => {
    let id = req.params.id;
    await Job.findByIdAndDelete(id);
    res.redirect('/jobs');
});

module.exports = router;

// apply in jobs
router.get('/jobs/:jobId/apply', isLoggedin, async function(req, res) {
	try {
		if (!req.user.cgpa) {
			return res.send('you have not entered your cgpa');
		}
		let { jobId } = req.params;
		let job = await Job.findById(jobId);
		if (req.user.cgpa < job.cgpa) {
			return res.send('your cgpa is not enough');
		}
		for (let user of job.appliedUsers) {
			if (user._id.equals(req.user._id)) {
				return res.send('you can only apply once');
			}
		}
		job.appliedUsers.push(req.user);
		await Job.save();
		console.log(job);
		res.redirect(`/jobs/${jobId}`);
	} catch (error) {
		console.log('error while applying in job', error);
	}
});
let mongoose = require('mongoose');
let jobSchema = new mongoose.Schema({
    name: {
		type: String,
		required: true,
	},
	address: String,
	image: String,
	package: Number,
	cgpa: Number,
	deadline: {
		type: Date,
       default: Date.now,
	},
	type:{
		type: String,
        default:'fulltime'
	}
});

let job = mongoose.model('job',jobSchema);
module.exports = job;
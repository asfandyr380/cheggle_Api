const db = require("../models");
const Jobs = db.jobs;


exports.createJobPost = (req, res) => {
    const job = new Jobs({
        title: req.body.title,
        logo: req.body.logo,
        video: req.body.video,
        category: req.body.category,
        job_type: req.body.job_type,
        location: req.body.location,
        email: req.body.email,
        mobile: req.body.mobile,
        description: req.body.desc,
    });

    job.save((err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: err });
        }
        return res.json({ success: true, message: "Success", data: result });
    })
};


exports.getJobs = (req, res) => {
    Jobs.find().exec((err, jobs) => {
        if (err) {
            return res.status(500).json({ success: false, message: err });
        }
        if (jobs.length === 0) {
            return res.status(500).json({ success: false, message: "No Jobs Found" });
        }
        return res.json({ success: true, message: "Success", data: jobs });
    });
};
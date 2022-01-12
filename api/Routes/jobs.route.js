const controller = require("../controllers/jobs.controller");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/jobs/create', controller.createJobPost);
    app.get('/api/jobs', controller.getJobs);
};
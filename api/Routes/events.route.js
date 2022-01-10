const controller = require("../controllers/events.controller");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/events/create', controller.createEvents);
    app.get('/api/events', controller.getevents);
    app.get('/api/events/:id', controller.geteventsbyuserId);

};
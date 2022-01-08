const controller = require("../controllers/app_packages.controller");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/packages', controller.getPackages);
    app.get('/api/packages/vPackages', controller.get_Vpackages);
    app.post('/api/packages/create', controller.createPackages);
    app.post('/api/packages/create/vPackage', controller.create_VideoPackage);
   
};
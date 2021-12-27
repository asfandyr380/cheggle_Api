const controller = require("../controllers/product.controller");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/product/featured', controller.getPopuler);
    app.get('/api/product/recent', controller.getRecent);
    app.get('/api/product/hot', controller.getTrending_hot);
    app.get('/api/product/:id', controller.getProduct);
    app.post('/api/product/create', controller.create);
};
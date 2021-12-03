const { authJwt } = require("../Middleware");
const controller = require("../controllers/user.controller");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/user/profile/upload', upload.single('file'), controller.uploadImg);

    app.post('/api/user/profile/changePass', controller.changePass);

    app.post('/api/user/update', controller.updateProfile);

    app.get("/api/user/all", controller.allAccess);

    app.get("/api/user/:id", controller.getUser);

    app.get(
        "/api/mode/mod",
        [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    );

    app.get('/api/user/wishlist/:id', controller.getWishlist);

    app.get(
        "/api/admin/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
};

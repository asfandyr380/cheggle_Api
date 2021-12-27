const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.product = require('./product.model');
db.services = require('./services.model');
db.token = require('./reser_token.model');
db.reviews = require('./reviews.model');
db.partners = require('./partners.model');
db.banners = require('./banners.model');


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
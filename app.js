require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./api/models");
const dbConfig = require("./config/database");

const Role = db.role;
const Services = db.services;

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

require('./api/Routes/auth.route')(app);
require('./api/Routes/user.route')(app);
require('./api/Routes/product.route')(app);
require('./api/Routes/partners.route')(app);
require('./api/Routes/banners.route')(app);
require('./api/Routes/category.route')(app);
require('./api/Routes/reviews.route')(app);
require('./api/Routes/businesss.route')(app);
require('./api/Routes/app_packages.route')(app);
require('./api/Routes/events.route')(app);
require('./api/Routes/jobs.route')(app);

db.mongoose
    .connect(`mongodb+srv://${dbConfig.USERNAME}:${dbConfig.PASS}@cheggle.jldec.mongodb.net/${dbConfig.DB}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });


function initial() {
    // Intialize Services Document if not Already
    Services.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Services({
                icon: "wifi",
                title: "Free Wifi"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added Free Wifi collection");
            });

            new Services({
                icon: "whatshot",
                title: "Shower"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added Shower collection");
            });

            new Services({
                icon: "pets",
                title: "Pets Allowed"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added Pets collection");
            });

            new Services({
                icon: "directions_bus",
                title: "Shuttle Bus"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added Bus collection");
            });

            new Services({
                icon: "shopping_cart",
                title: "Supper Market"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added Cart collection");
            });

            new Services({
                icon: "access_time",
                title: "Open 24/7"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added access Time collection");
            });
        }
    });

    // Intialize Roles Document if not Already
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'premium' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection");
            });
        }
    });
}


var PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('server up and running...');
});
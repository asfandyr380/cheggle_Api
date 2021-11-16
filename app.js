require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./api/models");
const dbConfig = require("./config/database");

const Role = db.role;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

require('./api/Routes/auth.route')(app);
require('./api/Routes/user.route')(app);

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
                console.log("added 'moderator' to roles collection");
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
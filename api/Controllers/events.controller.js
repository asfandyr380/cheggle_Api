const db = require("../models");
const Events = db.events;


exports.createEvents = (req, res) => {
    const event = new Events({
        title: req.body.title,
        day_num: req.body.day_num,
        day: req.body.day,
        month: req.body.month,
        image: req.body.image,
        video: req.body.video,
        owner_Id: req.body.owner_Id,
        joined_users: [],
    });

    event.save((err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: err });
        }
        return res.json({ success: true, message: "Success", data: result });
    })
};

exports.getevents = (req, res) => {
    Events.find().exec((err, events) => {
        if (err) {
            return res.status(500).json({ success: false, message: err });
        }

        // filter months
        var months = [];
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            months.push(event.month);
        }
        let uniqueMonths = [...new Set(months)];
        return res.json({ success: true, message: "Success", data: { events: events, months: uniqueMonths }, });
    });
};

exports.geteventsbyuserId = (req, res) => {
    const id = req.params.id;
    if (id === undefined) {
        return res.status(400).json({ success: false, message: "user id is not correct" });
    }
    Events.find({owner_Id: id}).exec((err, events) => {
        if (err) {
            return res.status(500).json({ success: false, message: err });
        }

        // filter months
        var months = [];
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            months.push(event.month);
        }
        // remove duplicate months
        let uniqueMonths = [...new Set(months)];
        return res.json({ success: true, message: "Success", data: { events: events, months: uniqueMonths }, });
    });
};
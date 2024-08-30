const express = require('express');
const router = express.Router();

router.get("/", function (req, res, next) {
    res.render("index", {
        title: "Expense Tracker | Homepage",
        user: req.user,
    });
});


module.exports = router;
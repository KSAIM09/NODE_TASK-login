const express = require("express");
const router = express.Router();
const UserSchema = require("../models/userSchema");
const { isLoggedIn } = require("../middleware/auth.middleware");

const passport = require("passport");
const LocalStrategy = require("passport-local");
passport.use(new LocalStrategy(UserSchema.authenticate()));


router.get("/signup", async (req, res) => {
    res.render("index", {
        title: "Expense Tracker | Signup",
        user: req.user,
    });
});

router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        await UserSchema.register({ username, email }, password);
        res.redirect("/user/signin");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/signin", async (req, res) => {
    res.render("signin", {
        title: "Expense Tracker | Signin",
        user: req.user,
    });
});

// router.post("/signin", passport.authenticate("local"), async (req, res) => {
//     try {
//         res.redirect("/user/profile");
//     } catch (error) {
//         next(error);
//     }
// });

router.get('/success', (req, res) => {
    res.render('success')
})

router.post(
    "/signin",
    passport.authenticate("local", {
        successRedirect: "/user/success",
        failureRedirect: "/user/signin",
    }),
    (req, res) => {}
);



router.get("/signout", isLoggedIn, async (req, res) => {
    req.logout(() => {
        res.redirect("/user/signin");
    });
});

module.exports = router;
const dotenv = require('dotenv')
dotenv.config('./.env')
const express = require("express")
const path = require('path')
const app = express();
const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRoutes')
const UserSchema = require('./models/userSchema');

const session = require('express-session')
const passport = require("passport");

// static path

app.use(express.static(path.join(__dirname, 'public')))

// ejs 

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// passport and session config
app.use(
    session({
        secret: process.env.EXPRESS_SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(UserSchema.serializeUser());
passport.deserializeUser(UserSchema.deserializeUser());



// data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require('./models/db.connecnt');


app.use('/', indexRouter);
app.use("/user", userRouter);

app.listen(process.env.PORT ,() => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
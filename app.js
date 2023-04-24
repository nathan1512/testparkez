// App.js
    var express = require("express"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	LocalStrategy = require("passport-local"),
	passportLocalMongoose =
		require("passport-local-mongoose")
const User = require("./model/User");
const Space= require("./model/Space");
const { JsonWebTokenError } = require("jsonwebtoken");
var app = express();
const jwt = require('jsonwebtoken');


mongoose.connect("mongodb+srv://sarthakoberoiofficial:password12345678@cluster0.itn3z44.mongodb.net/testdb");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
	secret: "Rusty is a dog",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=====================
// ROUTES
//=====================

// Showing home page
app.get("/", function (req, res) {
	res.render("home");
});

// Showing secret page
app.get("/addspace", isLoggedIn, function (req, res) {
	res.render("addspace");
});

// Showing register form
app.get("/register", function (req, res) {
	res.render("register");
});
app.get("/secret", function (req, res) {
	res.render("secret");
});



// Handling user signup
app.post("/register", async (req, res) => {
	const user = await User.create({
	username: req.body.username,
	password: req.body.password
	});
	
	return res.status(200).json(user);
});

//Showing login form
app.get("/login", function (req, res) {
	res.render("login");
});

//Handling user login
app.post("/login", async function(req, res){
	try {
		// check if the user exists
		const user = await User.findOne({ username: req.body.username });
		if (user) {
		//check if password matches
		const result = req.body.password === user.password;
		if (result) {
			global.currentusername= req.body.username
			res.render("addspace");
			
		} else {
			res.status(400).json({ error: "password doesn't match" });
		}
		} else {
		res.status(400).json({ error: "User doesn't exist" });
		}
	} catch (error) {
		res.status(400).json({ error });
	}
});
app.post("/addspace", async (req, res) => {
	const space = await Space.create({
    addr: {country:req.body.addr.country,state:req.body.addr.state,district:req.body.addr.district,street:req.body.addr.street,propertynumber:req.body.addr.propertynumber,postalcode:req.body.addr.postalcode},
	capacity: req.body.capacity,
	username: global.currentusername
	});
	
	return res.status(200).json(space);
});

//Handling user logout
app.get("/logout", function (req, res) {
	req.logout(function(err) {
		if (err) { return next(err); }
		res.redirect('/');
	});
});



function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect("/login");
}

var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Server Has Started!");
});

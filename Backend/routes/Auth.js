const express = require('express');
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretjwtkey = require("../config.json").jwtToken;
const fetchuser = require('../middleware/fetchuser');


const router = express.Router();

//we cannot use req.body unless we pass the middle ware 

// Route 1 creating user /api/auth/createuser
router.post('/createuser',
	[
		body('name', "Enter a valid name").isLength({ min: 5 }),
		body('email', "Enter a valid email").isEmail(),
		body('password', "Password at least character long").isLength({ min: 5 })

	],
	async (req, res) => {
		console.log(req.body);

		//validate the email,password and name
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
			//   return message in error array that we set in body of message
		}

		try {

			// Checking if user already exist with same email address
			let user = await User.findOne({ email: req.body.email });

			if (user) {
				// if exist then return this
				return res.status(404).json({ error: "Please enter valid credentials" });
			}

			// creating secured password that can be stored in database

			const salt = bcrypt.genSaltSync(10);
			const secPassword = bcrypt.hashSync(req.body.password, salt);


			user = await User.create({
				name: req.body.name,
				email: req.body.email,
				password: secPassword,
			})

			const jwtData = {
				user: {
					id: user.id
				}
			}

			const jwtAuthToken = jwt.sign(jwtData, secretjwtkey);

			res.json({ authToken: jwtAuthToken });

		} catch (error) {

			console.error(error.message);
			res.status(500).json({error:"Internal Error occured",message:error.message});
		}
	});


// making login path and function

// Route 2 for loging in user /api/auth/login
router.post('/login',
	[
		body('email', "Enter a valid email").isEmail(),
		body('password', "Password cannot be empty").exists()

	],
	async (req, res) => {
		console.log(req.body);

		//validate the email,password and name
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
			//   return message in error array that we set in body of message
		}

		const { email, password } = req.body;

		try {

			// Checking if user already exist with same email address
			let user = await User.findOne({ email });

			if (!user) {

				// if dosen't exists then return this
				return res.status(404).json({ error: "Please enter correct credentials" });
			}

			const passwordCompare = await bcrypt.compare(password, user.password);

			if (!passwordCompare) {
				return res.status(400).json({ error: "Please enter correct credentials" });
			}


			const jwtData = {
				user: {
					id: user.id
				}
			}

			const jwtAuthToken = jwt.sign(jwtData, secretjwtkey);

			res.json({ authToken: jwtAuthToken });

		} catch (error) {

			console.error(error.message);
			res.status(500).json({error:"Internal Error occured",message:error.message});
		}
	});

// Route 3 get user /api/auth/getuser login required

router.post("/getuser", fetchuser, async (req, res) => {

	try {

		const userID = req.user.id;//in fetch user we gave req to user
		const user = await User.findById(userID).select("-password");//this select - means except password
		res.json(user);

	} catch (error) {

		console.error(error.message);
		res.status(500).json({error:"Internal Error occured",message:error.message});

	}

});


module.exports = router
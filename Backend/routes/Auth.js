const express = require('express');
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const router = express.Router();

//we cannot use req.body unless we pass the middle ware 

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
			user = await User.create({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
			})
			res.json(user);

		} catch (error) {
			
			console.error(error.message);
			res.status(500).send("Error occured in auth");
		}
	});

module.exports = router
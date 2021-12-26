const express = require('express');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Notes = require("../models/Notes");
const router = express.Router();


// Route 1 Add Notes login required
router.get('/addnote', fetchuser, [

	body('title', "Enter a valid title").isLength({ min: 3 }),
	body('description', "Password at least 5 character long").isLength({ min: 5 })

], async (req, res) => {

	//validate the title,description and tag
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
		//   return message in error array that we set in body of message
	}
	try {

		const note = await Notes.create({
			userid:req.user.id,
			title: req.body.title,
			description: req.body.description,
			tag: req.body.tag
		})

		res.json(note);

	} catch (error) {
		console.error(error.message);
		res.status(500).json({error:"Internal Error occured",message:error.message});
	}


});



// Route 2 fetch user Notes login required

router.get('/fetchallnotes',fetchuser,async(req,res)=>{

	try {		
		
		const notes=await Notes.find({user:req.user.id});
		res.json(notes)
		
	} catch (error) {
		
		console.error(error.message);
		res.status(500).json({error:"Internal Error occured",message:error.message});
	}


})

module.exports = router
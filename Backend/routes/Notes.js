const express = require('express');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Notes = require("../models/Notes");
const { route } = require('./Auth');
const router = express.Router();


// Route 1 Add Notes login required "/api/notes/addnote"

router.post('/addnote', fetchuser, [

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



// Route 2 fetch user Notes login required "/api/notes/fetchallnotes"

router.get('/fetchallnotes',fetchuser,async(req,res)=>{

	try {		
		
		const notes=await Notes.find({userid:req.user.id});
		res.json(notes)
		
	} catch (error) {
		
		console.error(error.message);
		res.status(500).json({error:"Internal Error occured",message:error.message});
	}


});


// Route 3 update user Notes login required "/api/notes/updatenote"

router.put('/updatenote/:id',fetchuser,async(req,res)=>{

	try {

		const {title,description,tag}=req.body;
		const newNote={};
		if(title){newNote.title=title;}
		if(description){newNote.description=description;}
		if(tag){newNote.tag=tag;}

		let note=await Notes.findById(req.params.id);
	
		if(!note){
			return res.status(404).send("Not Found");
		}

		// Allow updation only if user owns this Note
		if(note.userid.toString()!==req.user.id){
			return res.status(401).send("Not Allowed");
		}

		note=await Notes.findByIdAndUpdate(req.params.id,{$set: newNote}, {new:true});
		res.json(note);
		
	} 
	catch (error) {
		
		console.error(error.message);
		res.status(500).json({error:"Internal Error occured",message:error.message});

	}

});

// Router 4 delete Notes  "/api/notes/deletenote"
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{

	try {

		let note=await Notes.findById(req.params.id);
	
		if(!note){
			return res.status(404).send("Not Found");
		}
		
		//Allow deletion only if user owns this Note
		if(note.userid.toString()!==req.user.id){
			return res.status(401).send("Not Allowed");
		}

		note=await Notes.findByIdAndDelete(req.params.id);

		res.json({ "Success": "Note has been deleted", note: note });
		
	} 
	catch (error) {
		
		console.error(error.message);
		res.status(500).json({error:"Internal Error occured",message:error.message});

	}

});



module.exports = router
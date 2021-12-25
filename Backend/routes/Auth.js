const express = require('express');
const User = require("../models/User");
const router = express.Router();


//we cannot use req.body unless we pass the middle ware 
// router.get('/',(req,res)=>{
// 	res.send(req.body);
// });
router.post('/', (req, res) => {
	console.log(req.body);

	const user = new User(req.body);
	user.save(function (err) {
		if (err) {
			// you could avoid http status if you want. I put error 500 
			return res.status(500).send({
				success: false,
				message: 'User already exist!'
			});
		}
		res.send(req.body);
	});
});

module.exports = router
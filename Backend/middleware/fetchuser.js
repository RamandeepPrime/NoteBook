const jwt = require('jsonwebtoken');
const secretjwtkey = require("../config.json").jwtToken;


const fetchuser=(req,res,next)=>{
	
	const token=req.header('authToken');
	// console.log(token);

	if(!token){
		
		res.status(401).send({ error: "Please authenticate using a valid token" });

	}
	try {
	
		// console.log(secretjwtkey);
		const data=jwt.verify(token,secretjwtkey);//it gives user object with id inside it
		// console.log(data);
		req.user=data.user;	
		next();

	} catch (error) {
		res.status(401).send({ error: "Please authenticate using a valid token" ,message:error.message});
		
	}
	
	
}

module.exports=fetchuser

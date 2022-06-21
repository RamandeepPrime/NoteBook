const mongoose=require('mongoose')
const { name,password }=require("./config.json");
const dbname="iNoteBook";
const mongoURI=`mongodb+srv://${name}:${8700609379}@cluster0.cojauli.mongodb.net/${dbname}`;
const connectToMongo=()=>{
	mongoose.connect(mongoURI,()=>{
		console.log("connected to Mongo succesfully");
	})
}
module.exports=connectToMongo;
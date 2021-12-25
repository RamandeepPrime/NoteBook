const mongoose=require('mongoose')
const name=require("./config.json");
const dbname="iNoteBook";
const mongoURI=`mongodb+srv://${name.name}:${name.password}@ramandeepatlas.w8fqr.mongodb.net/${dbname}?authSource=admin&replicaSet=atlas-13ov13-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`
const connectToMongo=()=>{
	mongoose.connect(mongoURI,()=>{
		console.log("connected to Mongo succesfully");
	})
}
module.exports=connectToMongo;
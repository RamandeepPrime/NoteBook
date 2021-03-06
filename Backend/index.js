const connectToMongo=require('./db');
const express = require('express');

var cors = require('cors');

connectToMongo();
const app = express();
const port = 5000

// if we want to read request(req).body we need to use app.use(express.json())
app.use(cors())
app.use(express.json());


// we uses routes in routes folder by app.use
app.use('/api/auth',require("./routes/Auth"));
app.use('/api/notes',require("./routes/Notes"));


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
const connectToMongo=require('./db');
const express = require('express');
connectToMongo();
const app = express();
const port = 5000

// if we want to read request(req).body we need to use app.use(express.json())

app.use(express.json());


// we uses routes in routes folder by app.use
app.use('/api/auth',require("./routes/Auth"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
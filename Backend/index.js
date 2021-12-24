const connectToMongo=require('./db');
const express = require('express');
connectToMongo();
const app = express();
const port = 3000




// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// we uses routes in routes folder by app.use
app.use('/api/auth',require("./routes/Auth"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
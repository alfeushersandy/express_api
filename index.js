const express = require('express');
const app = express()
const port = 3000 
//import body-parser
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

//import route posts
const postRouter = require('./routes/Post');
app.use('/api/post', postRouter);

app.listen(port, () => {
    console.log(`app running on ${port}`);
})
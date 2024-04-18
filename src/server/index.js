var path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
// API
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?'
const apiKey = process.env.API_KEY
console.log(`Your API Key is ${process.env.API_KEY}`);

const app = express()

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.use(express.static('dist'))
//app.use(express.static('src/client'))


console.log(__dirname)

//variable for url and api key

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})


// POST Route
app.post('/api', async function (req, res) {
    userInput = req.body.url;
    console.log(`You entered: ${userInput}`);
    const apiURL = `${baseURL}key=${apiKey}&url=${userInput}&lang=en`;
    const response = await fetch(apiURL);
    const apiData = await response.json();
    console.log(apiData);
    res.send(apiData);
})


// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})



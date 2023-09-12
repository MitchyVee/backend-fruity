// Import Express =>
const express = require('express')
const cors = require('cors');

// Creating our server by calling Expree (you should always initialise your server like this) =>
const app = express() 

// above 1024 =>
const port = 3000 

const fruits = require('./fruits.json')

// Middleware
app.use(cors())
app.use(express.json())


app.get('/home', (req, res) => {
  res.status(200).send('Hello Sexy!') // this sends the status code 200 to the client
  //this can also be done using "res.sendStatus(200);"  without sending data/a message with it
}) // creating our first root
// [server-name].[method]('<path>', callback)
// req (request)/ res (response) -> these 2 arguments are always needed

app.get('/', (req, res) => {
    res.send("Hello, Fruity!")
})

//route to return all the fruits =>
app.get('/fruits', (req, res) => {
    res.send(fruits)
})

// Route to return a specific fruit and it's information =>
app.get('/fruits/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    const fruit = fruits.find(fruit => fruit.name.toLowerCase() == name)

    if (fruit == undefined) {
        // send an error
        res.status(404).send("The fruit doesn't exist")
    } else {
        res.send(fruit)
    }
})
// when writing a dynamic path, add the semi-colon to add the dynamic property/parameter => :<property>

// ADDING a new pice of fruit to the data

const ids = fruits.map(fruit => fruit.id);
console.log(ids);
let maxId = Math.max(...ids);
console.log(maxId);


app.post('/fruits', (req, res) => {
    console.log(req.body)
    const fruitName = req.body.name.toLowerCase()
    const fruitData = fruits.find(fruit => fruit.name.toLowerCase() == fruitName)
    console.log(fruitData)
    if (fruitData !== undefined) {
        res.status(409).send("The fruit already exists, pick another, chump!")
    } else {
        maxId += 1
        req.body.id = maxId
        fruits.push(fruitData)
        res.status(201).send("A new fruit has been added, well done!")
    }
})

// use an api testing tool which will simulate a request coming in from the client.

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) // bind the server to a port
// app.listen(<port>, () => {})


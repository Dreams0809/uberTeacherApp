const { request, response } = require('express');
const express = require('express')
const app = express()
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()

let db, 
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'Educators'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} Databse`)
        db = client.db(dbName)
    })
    .catch(err => console.log(err))


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/public', express.static('public'));

// GET
app.get('/',async (request, response)=>{
    response.render('index.ejs')
})
// app.get('/Home',async (request, response)=>{
//     response.render('index.ejs')
// })

app.get('/Create',async (request, response)=>{
    response.render('createProfile.ejs')
})

app.get('/CreateProfile', async (request, response)=> {
    response.render('createProfile.ejs')
})

app.get('/Login', async (request, response)=>{
    response.render('Login.ejs')
})


app.get('/Sign-Up',async (request, response)=>{
    response.render('Sign-Up.ejs')
})





// POST
// Create Professor Account//
app.post('/CreateAccount', async (request, response)=>{
    db.collection('CreateProfile').insertOne({
        firstName:request.body.fname, 
        Lastname:request.body.lname,
        Age: request.body.age,
        Email: request.body.email,
        Univeristy_College: request.body.school,
        Education:request.body.hloe,
        Race_Ethnicity: request.body.race,
        briefDescription: request.body.description,
        State: request.body.states,
        Resume: request.body.resume})
    .then(result => {
        console.log('Account Created')
        response.redirect('/createProfile')    
    })
    .catch(error => console.log(error))
})


//Searching for Professor (index.ejs)//
app.post('/EducatorSearch', async (request, response)=>{
    db.collection('EducatorSearch').insertOne({
       Professor: request.body.professor,
       City: request.body.city,
       Date: request.body.date,
       Subject: request.body.subject})
    .then(result =>{
        console.log('Searching for Educator')
        response.redirect('/')
        // make a page for the educator search //
    })
    .catch(error => console.log(error))
})


// Login (login.ejs) //
app.post('/Login', async (request, response) =>{
    db.collection('loginInfo').insertOne({
        Email: request.body.email,
        Password: request.body.password 
    })
    .then(result =>{
        console.log('Login info added')
        response.redirect('/')
    }).catch(error => console.log(error))
})

// Sign-up Info //

app.post('/Signup', async (request, response) =>{
    db.collection('loginInfo').insertOne({
        Email: request.body.email,
        Password: request.body.password 
    })
    .then(result =>{
        console.log('Signup info added')
        response.redirect('/')
    }).catch(error => console.log(error))
})







app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
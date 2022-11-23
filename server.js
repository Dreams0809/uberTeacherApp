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

// app.get('/subject/:subject', async (request, response)=>{
//     const subjectFromClient = request.params.subject
//     console.log('go')
//     const educator = await db.collection('CreateAccount').find({subject: subjectFromClient}).toArray()
//     response.render('index.ejs', { educator: educator })
// })

 app.get('/',async (request, response)=>{
    response.render('index.ejs', {educators: []})
})


// POST
// Create Professor Account//
app.post('/addInfo', async (request, response)=>{
    db.collection('CreateAccount').insertOne({
        firstName:request.body.fname, 
        lastName:request.body.lname,
        subject: request.body.subject,
        age: request.body.age,
        email: request.body.email,
        univeristyCollege: request.body.school,
        education:request.body.hloe,
        raceEthnicity: request.body.race,
        briefDescription: request.body.description,
        state: request.body.states,
        resume: request.body.resume})
    .then(result => {
        console.log('Account Created')
        response.redirect('/')    
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
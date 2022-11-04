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

app.get('/',async (request, response)=>{
     
    response.render('index.ejs')
})

app.get('/Create',async (request, response)=>{
     
    response.render('createProfile.ejs')
})


app.get('/CreateProfile', async (request, response)=> {
    response.render('createProfile.ejs')
})

app.post('/addInfo', async (request, response)=>{
    db.collection('CreateProfile').insertOne({thing:request.body.FName })
    db.collection('CreateProfile').insertOne({thing:request.body.LName })
    db.collection('CreateProfile').insertOne({thing:request.body.email })
    db.collection('CreateProfile').insertOne({thing:request.body.age })
    db.collection('CreateProfile').insertOne({thing:request.body.College })
    db.collection('CreateProfile').insertOne({thing:request.body.Education })
    .then(result => {
        console.log('Added all the info')
        response.redirect('/createProfile')    
    })
    .catch(error => console.log(error))
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
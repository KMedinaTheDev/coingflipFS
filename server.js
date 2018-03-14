const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://flipforit:flipforit1@ds019254.mlab.com:19254/coin-flip-fs', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('records').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {records: result})
  })
})

app.post('/records', (req, res) => {
  db.collection('records').save({userName: req.body.userName, totalG: 0, totalC: 0, flipResults: req.body.flipResults}, (err, result) => {
    console.log(req.body.userName)
    if (err) return console.log(err)
    console.log('saved to database')
    // res.redirect('/')
  })
})

app.post('/totalGuesses', (req, res) => {
  db.collection('records')
  .findOneAndUpdate({name: req.body.userName, flipResults: req.body.flipResults}, {
    $set: {
      totalG:req.body.totalG + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.post('/totalCorrect', (req, res) => {
  db.collection('records')
  .findOneAndUpdate({name: req.body.userName, flipResults: req.body.flipResults}, {
    $set: {
      totalG:req.body.totalC + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/recordss', (req, res) => {
  db.collection('records').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

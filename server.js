const express = require('express')  //requerindo express
const app = express() //app recebendo os express
const bodyParser = require('body-parser') //requerindo o body parser



const ObjectId = require('mongodb').ObjectID //metodo do Mongo, suporta hexadecimal (aquele valor meio aleatorio dos IDs)
const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost/crud-express"; //variavel url recebe onde está o endereço do mongo

app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect(url, (err, client) => {
  if (err) return console.log(err)
  db = client.db('crud-express')

  app.listen(3000, () => {
    console.log('Server running on port 3000')
  })
})


app.set('view engine', 'ejs')


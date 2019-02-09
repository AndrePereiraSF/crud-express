const express = require('express')  //requerindo express
const app = express() //app recebendo os express
require('../server')

app.route('/') //raiz, ex: /localhost:3000
.get(function (req, res) {
  db.collection('data').find() 
  res.render('index.ejs') //indicando o que deve aparecer nessa raiz, ou seja index.js
})

//ENVIANDO USERs
.post((req, res) => {
  db.collection('data').save(req.body, (err, result) => {
    if (err) return console.log(err)

  //  console.log('Padawan Salvo no Banco de Dados')
    res.redirect('/exibe')
  })
})


app.route('/exibe')
.get((req, res) => {
  db.collection('data').find().toArray((err, results) => {
    if (err) return console.log(err)
    res.render('exibe.ejs', { data: results })
  })
})



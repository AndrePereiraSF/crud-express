const express = require('express')  //requerindo express
const app = express() //app recebendo os express
const bodyParser = require('body-parser') //requerindo o body parser



const ObjectId = require('mongodb').ObjectID //metodo do Mongo, suporta hexadecimal (aquele valor meio aleatorio dos IDs)
const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost/crud-express"; //variavel url recebe onde está o endereço do mongo

app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err)
  db = client.db('crud-express')

  app.listen(3003, () => {
   // console.log('Server running on port 3003')
  })
})


app.set('view engine', 'ejs')


app.route('/') //raiz, ex: /localhost:3000
  .get((req, res) => {
    db.collection('data').find() //ei mongo, encontra ai os dados.
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

//EDITANDO users
app.route('/edit/:id') //pega o id
  .get((req, res) => { //pega requisicao e resposta
    var id = req.params.id //retornará parâmetros na rota correspondente: /edit/:id

    db.collection('data').find(ObjectId(id)).toArray((err, result) => { //procura, pega o "array" onde se encontra os dados
      if (err) return res.send(err) //caso der erro, devolva o erro pro usuario
      res.render('edit.ejs', { data: result }) //
    })
  })
  .post((req, res) => {
    var id = req.params.id
    var name = req.body.name  //req.body: Analisa corpos de requisição de entrada em um middleware antes de seus manipuladores. 
    var surname = req.body.surname

    db.collection('data').updateOne({ _id: ObjectId(id) }, { //atualiza os dados
      $set: {
        name: name,
        surname: surname
      }
    }, (err, result) => {
      if (err) return res.send(err)
      res.redirect('/exibe')
      //    console.log(' Padawan Atualizado no Banco de Dados')
    })
  })



//DELETANDO USERs
app.route('/delete/:id') //pega o id
  .get((req, res) => { //requisicao e resposta
    var id = req.params.id   //retornará parâmetros na rota correspondente: /delete/:id
    //deletando
    db.collection('data').deleteOne({ _id: ObjectId(id) }, (err, result) => { //vai na collection, procura o id e apaga
      if (err) return res.send(500, err)
      // console.log('Padawan Deletado do Banco de Dados!') //mostra no terminal
      res.redirect('/exibe') //volta pra tabela onde se encontra os dados
    })
  })


const express = require('express')  //requerindo express
const app = express() //app recebendo os express
require('../server')

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

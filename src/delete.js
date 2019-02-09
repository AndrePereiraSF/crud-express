const express = require('express')  //requerindo express
const app = express() //app recebendo os express
require('url');
require('../server')


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


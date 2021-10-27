//Express
  const express = require('express');
  const app = express();
  const port = 8081;
  const hostname = '127.0.0.1';



  //Handlebars
    const handlebars = require('express-handlebars');
    app.engine('handlebars', handlebars({defaultLayout:'main'}));
    app.set('view engine', 'handlebars');



  //bodyParser
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());


  
  //Rotas do express
    app.get('/', (req,res)=>{
      res.render('home')
    })
    
    app.get('/cadastrar', (req,res)=>{
      res.render('cadastrarNoticia')
    })

    app.post('/cadastrar', (req,res)=>{
      let title = req.body.titulo
      let conteudo = req.body.conteudo
      adicionarDados(title,conteudo,res)
    })

  //Enviando arquivos 
     app.use(express.static('public'));


      
  //Ligando Servidor
    app.listen(port,hostname,()=>{
        console.log('Servidor iniciado')
    })





//Sequelize 
  const database = require('./db')
  const Postagem = require('./models/postagem')
  database.sync()



  //Enviando dados para a tabela
    function adicionarDados(titulo, conteudo, res){
      Postagem.create({
        titulo: titulo,
        conteudo: conteudo
      }).then(()=>{
        console.log("Operação concluída com sucesso!")
        res.redirect('/')
      }).catch((erro)=>{
        res.send('Ocorreu um erro: '+ erro)        
      })
    }
// recuperar a biblioteca do express
const express = require('express')

//recuperar biblioteca express session
const session = require('express-session')

//adicionar os recusos do express ao nosso app
const app = express()

// definir o motor de views como sendo o EJS
app.set('view engine', 'ejs')

// setar o diretorio de views do EJS
app.set('views', './app/views')

// caminho dos arquivos estáticos
app.use(express.static('./app/public'))

// configuração para o método POST
app.use(express.urlencoded({extended:true}))

//Configuração do Express Session
app.use(session({
    secret: '+zLkSp9&Jr~FbN?z', // A senha não pode ter aspas e \
    resave: false,
    saveUninitialized: false
}))


module.exports = app
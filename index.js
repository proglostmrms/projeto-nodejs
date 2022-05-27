// npm init
// git init
// Dedendencias do projeto
// npm install express
// npm install ejs
// npm install pg
// npm install express-session

// recursos do desenvolvimento
// npm install -g nodemon

// recuperando o modulo de configuração do servidor
const app = require('./config/server')

// recuperar o modulo mockup
const noticias = require('./mockup')

// Importar modulo de conexão com banco de dados
const db = require('./config/dbConnection')

// rota home
app.get('/', function(req, res){
    db.query('SELECT * FROM noticias ORDER BY id_noticia DESC LIMIT 3', function(error, result){
        res.render('home/index', {noticias: result.rows})

    })
})

// rota noticias
app.get('/noticias', function(req, res){
    db.query('SELECT * FROM noticias ORDER BY id_noticia DESC', function(error, result){
        // passamos todas as noticias do arquivo mockup atravez de um objeto javascript
        res.render('news/noticias', {noticias: result.rows})
    })
    // passamos todas as noticias do arquivo mockup atravez de um objeto javascript
    // res.render('news/noticias', {noticias: noticias})
})

//rota noticia
app.get('/noticia', function(req, res){
    // recuperar id notícia por get
    const id = req.query.id

    db.query('SELECT * FROM noticias WHERE id_noticia = $1', [id], function(error, result){
        res.render('news/noticia', { noticia : result.rows[0] })

    })
})

//rota admin
app.get('/admin', function(req, res){
    const autorizado = req.session.autorizado
    if(autorizado == true){
    res.render('admin/form_add_noticia', {autorizado: autorizado })}
    else {
        res.render('admin/login')
    }
})

// Rota autenticar
app.post('/admin/autenticar', function(req,res){
    const {usuario, senha} = req.body
    console.log(usuario, senha)
    if( usuario == 'admin' && senha == 'cellep1234'){
        req.session.autorizado = true
    }
    res.redirect('/admin')
})

// Rota de encerrar sessão
app.get('/admin/sair', function(req, res){
    req.session.destroy( erro => {/*console.log(erro)*/})
    res.redirect('/admin')
})

//rota salvar noticia
app.post('/admin/salvar-noticia', function(req, res){
    // recuperar informações passadas por POST
    const { titulo, conteudo } = req.body
    // console.log(titulo, conteudo)
    db.query('INSERT INTO noticias(titulo, conteudo) VALUES ($1, $2)', [titulo, conteudo], function(error, result){
        res.redirect('/noticias')
    })
})

app.listen(3000, () => {
    console.log('Servidor rodando com express')
})
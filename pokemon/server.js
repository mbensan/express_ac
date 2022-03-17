const express = require('express')
const axios = require('axios')
const nunjucks = require('nunjucks')
const session = require('express-session')

const app = express()

nunjucks.configure('templates', {
  express: app,
  autoescape: true,
  watch: true
})

app.use(session({secret: 'miclavesecreta'}))
app.use(express.json())

app.get('/', async (req, res) => {
  const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon')
  const pokemones = data.results
  pokemones.map(pokemon => {
    pokemon.id = pokemon.url.split('/')[6]
  })

  console.log(req.session);
  res.render('index.html', {nombre: 'Pedro', capturados: req.session.mis_pokemones, pokemones})
})

app.get('/capturar', (req, res) => {
  if (!req.session.mis_pokemones) {
    req.session.mis_pokemones = []
  }
  req.session.mis_pokemones.push({
    name: req.query.name,
    id: req.query.id,
    url: req.query.url
  })
  
  res.redirect('/')
})

app.post('/propiedades/:comuna/:barrio', async (req, res) => {
  console.log('params', req.params)
  console.log('query', req.query)
  console.log('headers', req.headers)
  console.log('body', req.body)

  // acá realizas la búsqueda, etc ...
  res.send('No se encuentra ninguna propiedad con esos parámetros')
})



app.listen(3000)


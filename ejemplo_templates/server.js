const express = require('express')
const nunjucks = require('nunjucks')
const axios = require('axios')
const expressFileUpload = require('express-fileupload')

const app = express()

// definimos carpetas con nestros archivos estáticos
app.use(express.static('static'))
app.use(express.static('node_modules/bootstrap/dist'))

// configuramos la subida de archivos
app.use(expressFileUpload({
  limits: { fileSize: 5242880 },
  abortOnLimit: true,
  responseOnLimit: 'El peso del archivo supera el máximo (5Mb)'
}))

// configuramos el motor de templates (nunjucks)
nunjucks.configure('views', {
  express: app,
  autoescape: true,
  watch: true
})


app.get('/', async (req, res) => {
  const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon')
  // truco para obtener el ID de cada pokemon
  for (pokemon of data.results) {
    pokemon.id = pokemon.url.split('/')[6]
  }

  // renderizamos el template
  res.render('index.html', {pokemones: data.results})
})

app.get('/pokemon', async (req, res) => {
  const { data } = await axios.get(req.query.api_url)
  
  console.log(data);
  res.render('pokemon_detail.html', {pokemon: data})
})

app.get('/wikidex', (req, res) => {
  res.render('wikidex.html')
});

app.post('/set-avatar', async (req, res) => {
  console.log('datos del formulario', req.body.mensaje);
  const avatar = req.files.avatar
  
  console.log(avatar);
  await avatar.mv('static/avatar.png')
  
  res.redirect('/wikidex')
})

app.listen(3000, () => console.log('Servidor en puerto 3000'))

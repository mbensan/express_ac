const express = require('express')
const nunjucks = require('nunjucks')
const axios = require('axios')

const app = express()

// definimos carpetas con nestros archivos estáticos
app.use(express.static('static'))
app.use(express.static('node_modules/bootstrap/dist'))

// configuramos el motor de templates (nunjucks)
nunjucks.configure('views', {
  express: app,
  autoescape: true
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

app.listen(3000, () => console.log('Servidor en puerto 3000'))

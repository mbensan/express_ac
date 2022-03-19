const express = require('express')
const nunjucks = require('nunjucks')
const crypto = require('crypto')
const session = require('express-session')

const app = express()

// se configura nunjucks
nunjucks.configure('templates',{
  express:app,
  autoscape:true,
  noCache:false,
  watch:true
});

// Para el uso de sesiones
app.use(session({
  secret: "mi-clave",
  saveUninitialized:true,
  cookie: { maxAge: 60*60*1000*24 }, // 1 día
  resave: false
}));

app.get('/', (req, res) => {
  console.log('ejercicios en sesion', req.session.ejercicios);
  return res.json(req.session.ejercicios)
});

/**
 * req.params
 * req.query
 * req.body
 * req.files
 * req.headers
 */
app.get('/add/:nuevo', (req, res) => {
  if (!req.session.ejercicios) {
    req.session.ejercicios = []
  }
  const nuevo_ejercicio = req.params.nuevo
  req.session.ejercicios.push(nuevo_ejercicio)

  res.redirect('/')
})

app.get('/reset', (req, res) => {
  req.session.ejercicios = []
  res.redirect('/')
})

app.get('/random', (req, res) => {
  // 1. Me genero una palabra al azar
  const random_word = crypto.randomBytes(7).toString('hex')

  // 2. (inicio el contador si aún no existe). Le sumo 1 al contador 
  if (!req.session.contador) {
    req.session.contador = 0
  }
  req.session.contador++

  // 3. Renderizo el template
  const contador = req.session.contador
  res.render('random.html', { random_word, contador })
})

app.get('/random/reset', (req, res) => {
  req.session.contador = 0
  res.redirect('/random')
});

app.listen(3000, () =>console.log('ejecutando en puerto 3000'))

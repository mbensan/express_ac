const express = require('express')
const nunjucks = require('nunjucks')
const session = require('express-session')

const app = express()

// para recibir datos de formulario
app.use(express.json())
app.use(express.urlencoded({extended: true}))

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

app.use('/random', require('./routes/random.js'))
app.use('/gold', require('./routes/gold.js'))

app.get('/reset', (req, res) => {
  req.session.ejercicios = []
  res.redirect('/')
})

app.listen(3000, () =>console.log('ejecutando en puerto 3000'))

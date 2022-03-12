const express = require('express')

const app = express()

app.use(express.static('static'))
app.use(express.static('assets'))

// cargar archivos estáticos
app.use(express.static('node_modules/jquery/dist'))
app.use(express.static('node_modules/bootstrap/dist'))



const usuarios = ['Pedro', 'Maria', 'Jennifer', 'Claudio', 'Lia', 'Sofia']

app.get('/abracadabra/usuarios', (req, res) => {
  return res.send(usuarios)
})

app.use('/abracadabra/juego/:usuario', (req, res, next) => {
  const usuario = req.params.usuario
  const encontrado = usuarios.find(el => el == usuario)

  if (encontrado) {
    return next()
  }
  res.redirect('/who.jpeg')
})

app.get('/abracadabra/juego/:usuario', (req, res) => {
  res.send(`Hola, cómo estás ${req.params.usuario}`)
})


app.get('/abracadabra/conejo/:n', (req, res) => {
  const num_azar = Math.floor(Math.random() * 4)

  if (req.params.n == num_azar) {
    return res.redirect('/conejito.jpg')
  }
  res.redirect('/voldemort.jpg')
})


app.get('*', (req, res) => {
  res.send('Esta ruta no existe')
});

app.listen(3000, () => console.log('Servidor en el puerto 3000'))
const express = require('express')
const expressFileUpload = require('express-fileupload')
const nunjucks = require('nunjucks')
const fs = require('fs').promises

const app = express()

// configuramos la subida de archivos
app.use(expressFileUpload({
  limits: { fileSize: 5242880 },
  abortOnLimit: true,
  responseOnLimit: 'El peso del archivo supera el máximo (5Mb)'
}))

// cofiguramos archivos estáticos
app.use(express.static('static'))

// configuramos el motor de templates (nunjucks)
nunjucks.configure('templates', {
  express: app,
  autoescape: true,
  watch: true
})

app.get('/', async (req, res) => {
  const canciones = await fs.readdir('static/canciones')
  res.render('index.html', {canciones})
});

app.get('/eliminar-cancion/:nombre_cancion', async (req, res) => {
  const nombre_cancion = req.params.nombre_cancion

  await fs.unlink(`static/canciones/${nombre_cancion}`)
  res.redirect('/')
});

app.post('/canciones', async (req, res) => {
  // 1. Obtengo los datos del formulario
  const nombre = req.body.nombre
  const cancion = req.files.cancion

  // 2. Valido que la extensión sea MP3
  const extension = cancion.name.split('.').slice(-1).pop().toLowerCase()
  console.log({extension});

  if (extension != 'mp3') {
    return res.send('Formato incorrecto. Debe ser un MP3')
  }
  // 3. Guardo la canción
  await cancion.mv(`static/canciones/${nombre}.mp3`)
  res.redirect('/')
})


app.listen(3000, () => console.log('servidor ejecutando en puerto 3000'))

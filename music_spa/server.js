const express = require('express')

const app = express()

// importamos rutas desde un archivo externo
//  y le damos un prefijo
const guitar_routes_v1 = require('./api_v1.js')
app.use('/api/v1', guitar_routes_v1)

const guitar_routes_v2 = require('./api_v2.js')
app.use('/api/v2', guitar_routes_v2)

app.use(express.static('public'))

app.get('/', async (req, res) => {
  res.send('Servidor ejecutando')
})

app.listen(3000, () => console.log("Servidor encendido!"))

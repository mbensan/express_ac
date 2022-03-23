const express = require('express')
const guitarras = require('./data/guitarras.js')

const router = express.Router()

const guitarrasHeateoas = guitarras.map(guit => {
  return {
    name: guit.name,
    url: `/api/v2/guitarras/${guit.id}`
  }
})


router.get('/guitarras', (req, res) => {
  res.json({
    cantidad: guitarras.length,
    guitarras_encontradas: guitarrasHeateoas
  })
})

router.get('/guitarras/:id', (req, res) => {
  const guitarra_encontrada = guitarras.find(guit => guit.id == parseInt(req.params.id)) 
  res.json(guitarra_encontrada)
})

module.exports = router
const express = require('express')
const crypto = require('crypto')

const router = express.Router()


router.get('/', (req, res) => {
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

router.get('/reset', (req, res) => {
  req.session.contador = 0
  res.redirect('/random')
});

module.exports = router
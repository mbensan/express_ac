const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  if (!req.session.coins) {
    req.session.coins = 0
  }
  if (!req.session.activities) {
    req.session.activities = []
  }
  res.render('gold.html', {coins: req.session.coins, activities: req.session.activities})
});
                     
function valor_azar (min, max) {
  return Math.floor((Math.random() * (max - min)) + min)
}

router.post('/process_money', (req, res) => {
  const lugar = req.body.lugar

  if (lugar == 'Granja') {

    const valor = valor_azar(10, 20)
    req.session.coins += valor
    req.session.activities.push({
      text: `Ganaste ${valor} monedas en la Granja`,
      class: 'text-success'
    })

  } else if (lugar == 'Caverna') {

    const valor = valor_azar(5, 10)
    req.session.coins += valor
    req.session.activities.push({
      text: `Ganaste ${valor} monedas en la Caverna`,
      class: 'text-success'
    })

  }  else if (lugar == 'Casa') {

    const valor = valor_azar(2, 5)
    req.session.coins += valor
    req.session.activities.push({
      text: `Ganaste ${valor} monedas en la Casa`,
      class: 'text-success'
    })

  }  else if (lugar == 'Casino') {

    const valor = valor_azar(-50, 50)
    req.session.coins += valor
    if (valor >= 0) {
      req.session.activities.push({
        text: `Ganaste ${valor} monedas en el Casino`,
        class: 'text-success'
      })
    } else {
      req.session.activities.push({
        text: `Perdiste ${valor} monedas en el Casino`,
        class: 'text-danger'
      })
    }

  }
  
   res.redirect('/gold')
});

router.get('/reset', (req, res) => {
  req.session.coins = 0
  req.session.activities = []
  res.redirect('/gold')
})

module.exports = router
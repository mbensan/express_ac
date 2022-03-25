const express = require('express')

const router = express.Router()

// Rutas internas
function protected_routes (req, res, next) {
  if (!req.session.user) {
    req.flash('errors', 'Debe ingresar al sistema primero')
    return res.redirect('/login')
  }
  next()
}

router.get('/admin', protected_routes, (req, res) => {
  const user = req.session.user

  res.render('admin.html', { user })
});

router.get('/', protected_routes, (req, res) => {
  const user = req.session.user

  res.render('evidencias.html', { user })
});

module.exports = router
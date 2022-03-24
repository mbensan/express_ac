const express = require('express')
const { get_user, create_user } = require('./db.js')

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

// Rutas de Auth (externas)
router.get('/login', (req, res) => {
  const errors = req.flash('errors')
  res.render('login.html', { errors })
});

router.post('/login', async (req, res) => {
  // 1. Recuperar los valores del formulario
  const email = req.body.email
  const password = req.body.password

  // 2. Validar que usuario sí existe
  const user = await get_user(email)
  if (!user) {
    req.flash('errors', 'Usuario no existe o contraseña incorrecta')
    return res.redirect('/login')
  }

  // 3. Validar que contraseña coincida con lo de la base de datos
  if (user.password != password) {
    req.flash('errors', 'Usuario no existe o contraseña incorrecta')
    return res.redirect('/login')
  }

  // 4. Guardamos el usuario en sesión
  req.session.user = user
  res.redirect('/')
});

router.get('/register', (req, res) => {
  const errors = req.flash('errors')
  res.render('register.html', { errors })
});

router.post('/register', async (req, res) => {
  // 1. Recuperamos los valores del formulario
  const email = req.body.email
  const name = req.body.name
  const password = req.body.password
  const password_confirm = req.body.password_confirm

  // 2. validar que contraseñas sean iguales
  if (password != password_confirm) {
    req.flash('errors', 'La contraseñas no coinciden')
    return res.redirect('/register')
  }

  // 3. validar que email no exista previamente
  const user = await get_user(email)
  if (user) {
    req.flash('errors', 'Usuario ya existe o contraseña incorrecta')
    return res.redirect('/register')
  }

  await create_user(email, name, password)

  // 4. Guardo el nuevo usuario en sesión
  req.session.user = { name, email, password }
  res.redirect('/')
});

router.get('/logout', (req, res) => {
  // 1. Eliminamos al usuario de la sesión
  req.session.user = undefined
  // 2. Lo mandamos al formulario de login
  res.redirect('/login')
})



module.exports = router
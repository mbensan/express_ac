const express = require('express')
const { get_user, create_user } = require('./db.js')

const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login.html')
});

router.get('/register', (req, res) => {
  res.render('register.html')
});

router.post('/register', async (req, res) => {
  console.log(req.body);
  // 1. Recuperamos los valores del formulario
  const email = req.body.email
  const name = req.body.name
  const password = req.body.password
  const password_confirm = req.body.password_confirm

  // 2. validar que contraseñas sean iguales
  if (password != password_confirm) {
    //return res.send('Contraseñas no coinciden')
    return res.redirect('/register')
  }

  // 3. validar que email no exista previamente
  const user = await get_user(email)
  if (user) {
    //return res.send('Usuario ya existe o contraseña incorrecta')
    return res.redirect('/register')
  }

  await create_user(email, name, password)
  res.send('registro exitoso')
});

router.get('/admin', (req, res) => {
  res.render('admin.html')
});

router.get('/', (req, res) => {
  res.render('evidencias.html')
});


module.exports = router
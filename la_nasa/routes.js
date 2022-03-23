const express = require('express')

const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login.html')
});

router.get('/register', (req, res) => {
  res.render('register.html')
});

router.get('/admin', (req, res) => {
  res.render('admin.html')
});

router.get('/', (req, res) => {
  res.render('evidencias.html')
});


module.exports = router
const express = require('express');

const app = express()

app.use(express.json())
app.use(express.static('static'))


app.post('/datos/:nombre/:curso', (req, res) => {
  console.log('req.params', req.params);
  console.log('req.query', req.query);
  console.log('req.body', req.body);
  console.log('req.headers', req.headers);

  res.send(`${req.params.nombre} cumplió satisfactoriamente el curso ${req.params.curso}`)
})
// https://pokeapi.co/api/v2/pokemon?limit=100&offset=200

// res.send('algo')  => retorna un texto
// res.json({hola: 'chao'})  => retorna un JSON
// res.status(404)   => Manda un código de respuestas HTTP

app.get('/fotos', (req, res) => {
  res.download('./files/Denholm_shock.jpg')
});

app.get('/peliculas', (req, res) => {
  res.redirect('https://cuevana3.io/')
});

// ejemplo de una ruta protegida usando middlewares
function pass_requerido (req, res, next) {
  const pass = req.headers.pass

  if (pass != '12345') {
    return res.status(403).send('No posee acceso para este recurso')
  }

  next()
}

app.get('/tiempo', pass_requerido, (req, res) => {
  res.json({tiempo: new Date()})
});

app.get('/feed', pass_requerido, (req, res) => {
  res.json([
    {
      title: 'Google nuevo presidente del mundo mundial',
      body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat minima unde dolor, aut nesciunt tempore expedita magni, culpa eius corporis repellendus dicta temporibus, quibusdam eum quidem. Harum fuga perferendis maxime.'
    },
    {
      title: 'Raise by Wolves',
      body: 'Recusandae aperiam ea pariatur incidunt soluta libero magni distinctio, saepe nisi qui excepturi sint corporis debitis non, dolor quo. Architecto nesciunt corrupti suscipit eum ipsam odit molestiae repellat dignissimos aperiam.'
    }
  ])
});


app.listen(3000, () => console.log('Servidor en puerto 3000'))
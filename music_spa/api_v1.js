const express = require('express')
const guitarras = require('./data/guitarras.js')

const router = express.Router()

function getGuitarrasHateoas(body, order, fields) {
  let guitarrasHateoas = guitarras;
  if (body) {
    guitarrasHateoas = guitarrasHateoas.filter(guitar => guitar.body == body)
  }

  if (order) {
    guitarrasHateoas = guitarrasHateoas.sort(function (obj1, obj2) {
      return obj1[order] - obj2[order]
    })
  }
  // id,brand,model
  if (fields) {
    console.log(fields);
    // me declaro un arreglo vacio, en donde retornar las guitarras con los campos especificados
    const guitarrasFields = []
    // itero sobre las guitarras ya preprocesadas
    for (let guitarra of guitarrasHateoas) {
      const guitar = {
        url: `/api/v1/guitarras/${guitarra.id}`
      }
      // por cada nueva guitarra, itero sobre los fields especificados en la URL,
      //  y lo agrego a la guitarra nueva
      for (let field of fields.split(',')) {
        guitar[field] = guitarra[field]
      }
      guitarrasFields.push(guitar)
    }
    return guitarrasFields
  }

  guitarrasHateoas = guitarrasHateoas.map(guitar => {
    return {
      name: guitar.name,
      url: '/api/v1/guitarras/' + guitar.id
    }
  })

  return guitarrasHateoas
}



router.get('/guitarras', (req, res) => {
  // podemos filtrar por el body de cada guitarra
  let guitarras = getGuitarrasHateoas(req.query.body, req.query.order, req.query.fields)

  res.json({
    count: guitarras.length,
    guitarras
  })
})

router.get('/guitarras/:id', (req, res) => {
  const guitarra_encontrada = guitarras.find(guit => guit.id == parseInt(req.params.id)) 
  res.json(guitarra_encontrada)
})

module.exports = router
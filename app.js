const express = require('express')
const { engine } = require('express-handlebars')

const db = require('./models')
const Restaurants = db.Restaurants

const app = express()
const port = 3000
const restaurants = require('./public/jsons/restaurants.json').results

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
  const keyword = req.query.search
  const matchRestaurants = keyword ? restaurants.filter((restaurant) =>
    Object.values(restaurant).some((property) => {
      if (typeof property === 'string') {
        return property.toLowerCase().includes(keyword.toLowerCase())
      }
      return false
    })
  ) : restaurants
  res.render('index', { restaurants: matchRestaurants, keyword })
})

// app.get('/todos', (req, res) => {
//   return Todo.findAll({
//     attributes: ['id', 'name'],
//     raw: true
//   })
//     .then((todos) => res.render('todos', { todos }))
//     .catch((err) => res.status(422).json(err))
// })

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurants.find((restaurant) => restaurant.id.toString() === id)
  res.render('detail', { restaurant })
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id

  return Restaurants.findByPk(id, {
    attributes: ['id', 'name'],
    raw: true
  })
    .then((restaurant) => res.render('edit', { restaurant }))
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})
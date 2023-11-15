const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/restaurant_list')
})

app.get('/restaurant_list', (req, res) => {
  res.render('index')
})

app.get('/restaurant/:id', (req, res) => {
  res.send(`read movie:${id}`)
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})
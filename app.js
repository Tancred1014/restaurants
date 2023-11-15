const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/restaurant_list')
})

app.get('/restaurant_list', (req, res) => {
  res.send('listing restaurant')
})

app.get('/restaurant/:id', (req, res) => {
  res.send(`read movie:${id}`)
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})
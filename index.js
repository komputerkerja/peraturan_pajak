const express = require('express')
const app = express()
const server = require('http').Server(app)
const needle = require('needle')
const PORT = process.env.PORT || 5000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req,res) => {
    res.render('home', {
        title: 'home'
    })
})

app.post('/detail', async (req,res) => {
    const url = req.body.url
    const data = await needle('get', url)
    res.status(200).send(data.body)
})

server.listen(PORT, () => console.log(`Server runing on http://localhost:${PORT}`))
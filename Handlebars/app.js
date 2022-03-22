const express = require('express')
const app = express()
const handlebars = require("express-handlebars");

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`))

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts'
}))
app.set('view engine', 'hbs');
app.set('views', './views');


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let productos = []

app.get('/', (req, res) => {
    res.render('./layouts/index')
})

app.get('/producto', (req, res) => {
    res.render('./layouts/produc.hbs')
})

app.post('/productos',(req, res) => {
    let productosById = productos.sort((a, b) => a.id - b.id)
    const ultimoProducto = productosById[productosById.length - 1]
    const nuevoProducto = req.body
    productos.push(nuevoProducto)
    console.log(productos)
    res.render('index.hbs')
})


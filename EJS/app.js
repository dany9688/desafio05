const express = require('express')
const { Router } = express
const app = express()
const router = Router()

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`))

app.use('/static', express.static(__dirname + '/public'));

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', router)

let productos = []

// {
//     title: "Libro",
//     price: 15,
//     thumbnail: "www.google.com",
//     id: 0
// },
// {
//     title: "Carpeta",
//     price: 153,
//     thumbnail: "www.google.com.ar",
//     id: 1
// }

//VER TODOS LOS PRODUCTOS
router.get('/', (req, res) => {
    res.render('index', {productos})
})

router.get('/productos', (req, res) => {
    res.render('tabla', {productos})
})

//NUEVO PRODUCTO
router.post('/productos',(req, res) => {
    let productosById = productos.sort((a, b) => a.id - b.id)
    const ultimoProducto = productosById[productosById.length - 1]
    const nuevoProducto = req.body
    productos.push(nuevoProducto)
    console.log(productos)
    res.render('index', {productos})
})


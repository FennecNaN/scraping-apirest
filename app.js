const scraping = require('./scraping');
const express = require('express');
const app = express()
const fs = require('fs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const url = 'https://elpais.com/ultimas-noticias/'


app.get('/scraping', (req,res) => {
     scraping.scraping();
    console.log('HOLA')
})

// // obtener noticia por indice
// app.get('/:indice', (req, res) => {
//   const indice = req.params.indice;
//   const noticias = leerDatos();
//   const noticia = noticias.find(noticia => noticia.indice == indice)
//   res.json(noticia)
//   console.log(noticias)
// })


// Leer datos desde el archivo JSON
function leerDatos() {
    let noticias = [];
    try {
      const data = fs.readFileSync('noticias.json', 'utf-8');
      noticias = JSON.parse(data);
    } catch (error) {
      console.error('Error al leer el archivo noticias.json:', error.message);
    }
  }
  
// Guardar datos en el archivo JSON
function guardarDatos() {
    fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));
  }



// no has visto nada de nada :D ...
// app.post('/scrapingg', (req, res) => {
//     let noticias = leerDatos();
//     const noticia = {
//         titulo: req.body.title,
//         imagen: req.body.imgs,
//         descripcion: req.body.description,
//         enlace: req.body.link,
//     };
   
//     console.log(noticias)
//     noticias.push(noticia);
//     guardarDatos(noticias)
//     res.send('Noticia creada exitosamente')
// })

app.listen(3000, () => {
  console.log('Escuchando en puerto 3000')
})
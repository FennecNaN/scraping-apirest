const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

const url = 'https://elpais.com/ultimas-noticias/'

function scraping(){
    axios.get(url).then((response) => {
        if(response.status === 200){
            const html = response.data;
            const $ = cheerio.load(html);

            //recogida de datos

            let noticias = [];

            $('article.c.c-d.c--m').each((index, element) => {
                const title = $(element).find('h2.c_t').text();

                const imgs = $(element).find('img').attr('src');
    
                const description = $(element).find('p.c_d').text();

                const link = $(element).find('a').attr('href');

                const noticia = {
                    titulo: title,
                    imagen: imgs,
                    descripcion: description,
                    enlace: link,
                };
                console.log(noticia)
                noticias.push(noticia);
                
        
            });
            
            fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));
        };
    });     

};

module.exports =  {scraping};


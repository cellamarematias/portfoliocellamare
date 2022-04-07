const express = require('express');
const app = express();
const path = require('path');
const { engine } = require('express-handlebars');
const { application, urlencoded } = require('express');
app.use(express.urlencoded({extended: false}));  // para poder leer el contenido del form
const flash = require('connect-flash');



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`My app is running on port ${ PORT }`);
});

// configuraciones
app.set('views', path.join(__dirname, 'views'));  // config del handelbars
app.engine('.hbs', engine({
  defaultLayout: 'main', // nombre del arch ppal - acá van las partes ppales - navigation, footer, etc
  layoutsDir: path.join(app.get('views'), 'layouts'), // le paso la dir de la carpeta
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars.js')
}))
app.set('view engine', '.hbs'); // para usar el motor

//middlewares


// variables GLOBALES


//rutas
app.use(require('./routes/index')); // uso la ruta definida en routes/index



//archivos públicos
app.use(require('./routes/index')); // linkeo la carpeta index.js
//app.use('/links', require('./routes/links'));
app.use(express.static(path.join(__dirname, 'public')));



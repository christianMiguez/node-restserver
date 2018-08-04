// ======================
// Puerto
// ======================

process.env.PORT = process.env.PORT || 3000;

// ======================
// Entorno
// ======================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// ======================
// Base de datos
// ======================
let urlDB;

if(process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/burguerQueen'
} else {
    urlDB = 'mongodb://kisquian:cerro2009@ds127439.mlab.com:27439/burguerqueen'
}

process.env.URLDB = urlDB;
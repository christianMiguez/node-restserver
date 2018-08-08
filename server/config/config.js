// ======================
// Puerto
// ======================

process.env.PORT = process.env.PORT || 3000;

// ======================
// Entorno
// ======================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// ======================
// Vencimiento de token
// ======================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ======================
// Secret o Seed de autenticación
// ======================
process.env.SEED = process.env.SEED || 'secret';

// ======================
// Base de datos
// ======================
let urlDB;

if(process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/burguerQueen'
} else {
    urlDB = process.env.MongoDB
}

process.env.URLDB = urlDB;
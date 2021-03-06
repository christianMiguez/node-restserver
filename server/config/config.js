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
process.env.CADUCIDAD_TOKEN = '48h';
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
// ======================
// Google Client ID
// ======================
process.env.CLIENT_ID = process.env.CLIENT_ID || '667213072482-l5kh0l4t6ofue9aktgvg36m0afi2lq2u.apps.googleusercontent.com';
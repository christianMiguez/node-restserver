require('./config/config');
const express = require('express')
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());
 
app.get('/usuario', function (req, res) {
    res.json('get Usuarios')
});
app.post('/usuario', function (req, res) {
    let body = req.body;
    if(body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es required'
        });
    } else {
        res.json({
            persona: body
        })
    }

});
 
app.listen(process.env.PORT, () => {
    console.log('Listen ',process.env.PORT)
})
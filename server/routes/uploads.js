const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const Usuario = require('../models/usuario');
const fs = require('fs');
const path = require('path');
const Producto = require('../models/producto');

// Default options
app.use(fileUpload());

app.put('/upload/:tipo/:id', (req, res) => {

    let tipo = req.params.tipo;
    let id = req.params.id;
    if(!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No files were uploaded'
            }
        })
    };

    // Validar tipo
    let tiposValidos = ['producto', 'usuario'];
    if(tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Los tipos permitidos son: ' + tiposValidos.join(', '),
            }
        })
    }

    let archivo = req.files.archivo;
    let nombreCortado = archivo.name.split('.')
    let extension = nombreCortado[nombreCortado.length - 1];    

    // Extensiones validas
    let extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if(extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Las extensiones permitidas son: ' + extensionesValidas.join(', '),
                extension: extension
            }
        })
    }

    // Cambiar nombre de archivo unico
    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;


    archivo.mv(`server/uploads/${tipo}/${nombreArchivo}`, (err) => {
        if (err)
          return res.status(500).json({
              ok: false,
              err
          });

          // Aqui, imagen cargada
          if (tipo === 'usuario') {
            imagenUsuario(id, res, nombreArchivo)
          } else {
            imagenProducto(id, res, nombreArchivo)
          }
          
          
        
          
      });

});

function imagenUsuario(id, res, nombreArchivo) {

    Usuario.findById(id, (err, usuarioDB) => {
        if(err) {
            borraArchivo(nombreArchivo, 'usuario');
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!usuarioDB) {
            borraArchivo(nombreArchivo, 'usuario');
            return res.status(400).json({
                ok: false,
                err: {
                    message: "No existe el usuario"
                }
            })
        }

        borraArchivo(usuarioDB.img, 'usuario');
        
        usuarioDB.img = nombreArchivo
        usuarioDB.save((err, usuarioGuardado)=> {
            res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo
            })
        })
    })
    
}

function imagenProducto(id, res, nombreArchivo) {
    Producto.findById(id, (err, productoDB) => {
        if(err) {
            borraArchivo(nombreArchivo, 'producto');
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!productoDB) {
            borraArchivo(nombreArchivo, 'producto');
            return res.status(400).json({
                ok: false,
                err: {
                    message: "No existe el producto"
                }
            })
        }

        borraArchivo(productoDB.img, 'producto');
        
        productoDB.img = nombreArchivo
        productoDB.save((err, productoGuardado)=> {
            res.json({
                ok: true,
                usuario: productoGuardado,
                img: nombreArchivo
            })
        })
    })
}

function borraArchivo(nombreImagen, tipo) {
    let pathImagen = path.resolve(__dirname, `../../server/uploads/${tipo}/${nombreImagen}`);
    if(fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }
}

module.exports = app;
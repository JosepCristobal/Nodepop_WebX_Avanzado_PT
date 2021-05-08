
'use strict';
require('dotenv').config();
// Cargamos el conector a la base de datos y la dejamos a punto de utilizar
require('./connectMongoose');
// cargar el modelo Anuncios
const Anuncio = require('../models/Anuncio');
const fs = require('fs');
const path = require('path'); 
const { exit } = require('process');
const fichAnuncios = path.join('./config', 'anunciosImp.json');

// Generar usuarios en Mongo


//Eliminamos todos los anuncios
async function borraAnuncio(){  
    try{
        await Anuncio.deleteMany({});
        console.log('success borrar anuncios:', true);
        return;
    }catch (err){
        console.log('error en borrar anuncios:',err);
        return (err);
    } 
}

//Función que inserta todos los registros del json cargado de una sola atacada
async function inserta(data){
    try {
        const insertaData = await Anuncio.insertMany(data)
        return insertaData
    } catch (error) {
        return error
    }
    
}

//Leemos y cargamos la información de nuestro fichero anunciosImp.json
function resultado(fichero) {
try {
    const dataFile = fs.readFileSync(fichero, 'utf8');
    return dataFile;
  } catch (error) {
    console.error(error);
    return error;
  }
}

//Función de llamada a la carga de datos en nuestra BBDD
async function loadAnuncios(){
    //Hacemos la llamada para borrar todos los anuncios de la BBDD
    await borraAnuncio();
    //Creamos un objeto parseado para insertar en la BBDD con inserción masiva
    //Leemos el ficheros y lo parseamos
    let data = JSON.parse(resultado(fichAnuncios));
    //Insertamos la información en nuestra BBDD
    await inserta(data.anuncios);
    console.log('Fin de proceso');
    exit()
}

//Ejecutamos la funciones de borrado y carga 
loadAnuncios();



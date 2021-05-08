
'use strict';
require('dotenv').config();
// Cargamos el conector a la base de datos y la dejamos a punto de utilizar
require('./connectMongoose');
// cargar el modelo Anuncios
const Anuncio = require('../models/Anuncio');
const fs = require('fs');
const path = require('path'); 
const { exit, mainModule } = require('process');
const fichAnuncios = path.join('./config', 'anunciosImp.json');


// Generar usuarios en Mongo
const User = require('../models/User')

main().catch(err => console.error(err));
async function main(){
    await loadAnuncios();
    await initUsuarios();
}

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
    //exit()
}

async function initUsuarios() {
    const { deletedCount } = await User.deleteMany();
    console.log(`Eliminados ${deletedCount} users.`);
  
    const result = await User.insertMany([
      {
        email: 'pepe@pepe.com',
        password: await User.hashPassword('1234')
      },
      {
        email: 'josep@josep.com',
        password: await User.hashPassword('1234')
      }
    ]);
    console.log(`Insertados ${result.length} user${result.length > 1 ? 's' : ''}.`)
    exit();
  }

//Ejecutamos la funciones de borrado y carga 




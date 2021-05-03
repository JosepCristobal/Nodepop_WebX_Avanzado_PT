'use strict';

const mongoose = require('mongoose');


//lista de tags permitidos

//Simulamos un enum en javascrip utilizando un objeto freeze (congelado) para que no pueda ser modificado
const tags = { "work":"work", "lifestyle":"lifestyle", "motor":"motor", "mobile":"mobile"};
Object.freeze(tags);

const anuncioSchema = mongoose.Schema({
  nombre: { type: String, index: true },
  venta: { type: Boolean, index: true },
  precio: { type: Number, index: true },
  foto: String,
  tags: { type: [String], index: true }
});

// Devolvemos todos los tags definidos
anuncioSchema.statics.allowedTags = function () {
  return Object.values(tags);
};

// Validamos que los tags de un nuevo registro de anuncio, estén dentro de los permitidos.
// si alguno de ellos no coincide, lo devolveremos con la respuesta de error.
anuncioSchema.statics.allowedTagsEnumValidate = function(arrTag){
  return validateTags(arrTag)
};

// Definimos un método estático para consultar los anuncios según los criterios de búsqueda
//Si en el limite de registros no recibimos valor, aplicaremos 100 registros como valor por defecto
anuncioSchema.statics.lista = function(data){
  const nombre = data.nombre;
  const venta = data.venta;
  const precio = data.precio;
  const tags = data.tags;
  const foto = data.foto;
  const limit = parseInt(data.limit) || 100;
  const skip = parseInt(data.skip) || 0;
  const fields = data.fields;
  const sort = data.sort;

  const filtro = {};
  if (nombre){
    //Usamos una expresion regular para la búsqueda del nombre no por contenido si no que empiece con el nombre de búsqueda, 
    //como si fuera un like e insensible a las may-min
    filtro.nombre = {$regex: '^'+nombre, $options: 'i'};
  }

  //Buscamos por el contenido de los tags de clasificación de producto
  if (tags){
    filtro.tags = {$in: tags};
  }

  //Filtramos si es venta = true o compra = false
  if (venta){
    filtro.venta = venta;
  }

  //Vamos a tratar el filtro del precio para buscar el intervalo que nos marque el usuario que consulta
  if (precio){   
      if (precio.indexOf('-') !== -1) {
        filtro.precio = {};
        let rango = precio.split('-');
        if (rango[0] !== '') {
          filtro.precio.$gte = rango[0];
        }
        if (rango[1] !== '') {
          filtro.precio.$lte = rango[1];
        }
      } else {
        filtro.precio = precio;
      }
    
  }

  const query = Anuncio.find(filtro);
  query.limit(limit);
  query.skip(skip);
  query.select(fields);
  query.sort(sort);
  return query.exec();
}

//Creamos un nuevo anuncio
anuncioSchema.statics.newAnuncio = function(anuncioNew,filename=''){
  if(filename){
    Object.assign(anuncioNew,{'foto': filename})
  }
  const anuncio = new Anuncio(anuncioNew);
  const createAnuncio =  anuncio.save();
  return createAnuncio;
}

// Validamos los tags asignados a nuevos anuncios o en una consulta al propio api
let validateTags = (arrTag) => {
  try {
    // Validamos que el valor que nos llega es un array, en el supuesto de recibir un string con un solo valor, este lo convertimos a array 
    let tagsArr;
    if (!Array.isArray(arrTag)){
        tagsArr = arrTag.split(',')
    } else {
        tagsArr = arrTag;
    }

    let result = [] ;
    for (let name in tagsArr){
        // eslint-disable-next-line no-prototype-builtins
        if (tags.hasOwnProperty(tagsArr[name]) === false){
          //Devolvemos los tags que no son reconocidos
            result.push(tagsArr[name]);
        }
    }
    return result;
  } catch (error) {
    console.error(error);
  }
}

// Creamos el modelo con el esquema definido
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;


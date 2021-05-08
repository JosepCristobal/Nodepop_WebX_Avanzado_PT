'use strict';
const cote = require('cote');
const Jimp = require('jimp');
const path = require('path')
//Servicio de conversión de imágen a thumbnail

// Declaramos el microsorvicio

const responder = new cote.Responder({name: 'Conversión imagen'})


//Creamos función para componer la ruta y el nombre de entrada y salida de la imágen
const pathImg = (ruta,nombre,in_out)=>{
    const nomOut = nombre.substr(0, nombre.length-4)+'_thumbnail'+ nombre.substr(-4)
    const dir_in = path.join(ruta,nombre);
    const dir_out = path.join(ruta,nomOut)

    if (in_out ==='in'){
        return dir_in
    } else if (in_out ==='out') {
        return dir_out;
    }else{
        return nomOut;
    }
    
}

//Creamos función para cambiar el tamaño de la imágen
const resize = async (imgIn,imgOut,size) =>{
    try {
        const image = await Jimp.read(imgIn);
        // Resize the image to 'width auto' and heigth parameter size.
        await image.resize(Jimp.AUTO, size);
        // Save and overwrite the image
        await image.writeAsync(imgOut);
    } catch (error) {
        next(error);
    }
}

//Lógica del microservicio
responder.on('convertir imagen', (req, done) => {
    
    //const completePath = req.completePath
    const completePath = '../nodepop/public/images/anuncios'
    const filename = req.nameImage
    resize(pathImg(completePath,filename,'in'),pathImg(completePath,filename,'out'),100 )
    const resultado = pathImg(completePath,filename,'filename');
    //Devolvemos el nombre de la nueva imágen creada
    done(resultado); 
});

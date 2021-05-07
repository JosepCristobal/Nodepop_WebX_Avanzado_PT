'use strict';
const cote = require('cote');
const jimp = require('jimp');
const path = require('path')
//Servicio de conversión de imágen a thumbnail

// Declaramos el microsorvicio

const responder = new cote.Responder({name: 'conversion'})

const pathImg = (ruta,nombre,in_out)=>{
    const nomOut = nombre.substr(0, nombre.length-4)+'_thumbnail'+ nombre.substr(-4)
    const dir_in = path.join(ruta,nombre);
    const dir_out = path.join(ruta,nomOut)
    //const resultado = `Directorio in ${dir_in}  directorio de salida ${dir_out}`
    if (in_out ==='in'){
        return dir_in
    } else if (in_out ==='out') {
        return dir_out;
    }else{
        return nomOut;
    }
    
}


const resize = async (imgIn,imgOut,size) =>{
    const image = await Jimp.read(imgIn);
    // Resize the image to width auto and heigth size.
    await image.resize(Jimp.AUTO, size);
    // Save and overwrite the image
    await image.writeAsync(imgOut);
}

//Lógica del microservicio
responder.on('convertir imagen', (req, done) => {
    //const resultado0= transformImg('c:/temp','Img002.jpg');
    const completePath = req.completePath
    const filename = req.fileName
    resize(pathImg(completePath,filename,'in'),pathImg(completePath,filename,'out'),100 )
    const resultado = `${texto}`;

    done(resultado);
});

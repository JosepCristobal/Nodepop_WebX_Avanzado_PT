# Práctica Backend Avanzado
Entrega de práctica de Node JS avanzado Bootcamp Web X

## Objetivo

Esta práctica es una continuación de la que se hizo en fundamentos y nuestro objetivo es  

-	Implementar los conceptos de segurida y autenticación para acceder a nuestra API.
-	Implementar la internacionalización en nuestra parte desarrollada de front.
- 	Subida de imagenes directamente desde nuestra API y registro en nuestra BBDD.
-  Generar un thumbnail de cada imagen subida, a través de un microservicio que correrá en background.
-  Y opcionalmente, podemos implementar el testing en nuestro proyecto.

## Consideraciones generales

1. Autenticación
	* Nuestro API necesita protegerse, para ello debemos implementar autenticación JWT al API. No lo aplicaremos en nuestra parte de fron en nuestro website.
	* Crearemos una ruta POST /api/authenticate para hacer login y devolver el token JWT.
	* En la ruta GET /apiv1/anuncios incluiremos el JWT en una cabecera o en el query-string para hacer la petición y validar que el usuario tiene permisos para acceder.
	* Si hacemos la llamada a /apiv1/anuncios con un token caducado o bien sin token, devolveremos un código de status HTTP 401 y un json con información del error.
	* Debemos crear al menos un usuario con email y clave para poder hacer las puebas.		
2. 	Internacionalización
	* En este punto consiste en convertir el frontend de anuncios de la aplicación Nodepop en multi-idioma.
	* El API no lo vamos a internacionalizar.
	* Los idiomas a programar serán el español y el inglés.
	* Deberá disponer de un selector de idiomas para que el usuario pueda cambiar de idioma en cualquier momento.
3. Subida de imagen con tarea en background
	* El API necesita en end-point para crear anuncios.
	* POST /apiv1/anuncios debería permitir que el cliente del API suba una imagen y esta pueda ser guardada en el servidor de tal forma que cuando hagamos las peticiones GET, nos sean devueltas las rutas a éstas imágenes y dichas rutas funcionen.
	* Cada imagen que se suba deberá tener un thumbnail.
	* Crear un microservicio que recibirá trabajos y los ejecutará creando nuestros thumbnails.
	* Las imágenes habrá que reducirlas a un tamaño de 100x100.
4. Testing
	* Para tener un código de calidad es altamente recomendable implementar los tests.
	* Los tests se deberán poder ejecutar con 'npm test'.

## Desarrollo de proyecto
En el siguiente enlace, describimos paso a paso todo el recorrido que hemos seguido en el desarrollo de nuestro proyecto:

[Paso a paso](https://github.com/JosepCristobal/Nodepop_WebX_Avanzado_PT/blob/master/README_Steps.md)

En todo nuestro código hemos incluido comentarios para poder hacer un seguimiento y clarificar que hace cada una de nuestras funcionalidades (funciones, clases, midelwares, rutas, etc.).

Hemos intendado dejar un código limpio y claro, estructurandolo de la forma más adecuada y siguiendo los criterios aprendidos en este módulo.

Los componentes a destacar utilizados en nuestro proyecto son:

* Visual Studio Code v1.53.0 como entorno de desarrollo.
* Node.js v14.15.1 como motor de nuestro servidor de aplicaciones.
* Express v4.16.1 como Framework web para nuestro proyecto en node.js.
* MongoDB v4.4.3 como motor de base de datos.
* Nuestro proyecto ha sido desarrollado en un Macbook con MacOS Catalina v10.15.7




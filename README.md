# Práctica Backend Avanzado
Entrega de práctica de Node JS avanzado Bootcamp Web X

## Objetivo

Esta práctica es una continuación de la que se hizo en fundamentos y nuestro objetivo es  

-	Implementar los conceptos de seguridad y autenticación para acceder a nuestra API.
-	Implementar la internacionalización en nuestra parte desarrollada de front.
- 	Subida de imágenes directamente desde nuestra API y registro en nuestra BBDD.
-  Generar un thumbnail de cada imagen subida, a través de un microservicio que correrá en background.
-  Y opcionalmente, podemos implementar el testing en nuestro proyecto.

## Consideraciones generales

1. Autenticación
	* Nuestro API necesita protegerse, para ello debemos implementar autenticación JWT al API. No lo aplicaremos en nuestra parte de front en nuestro website.
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


## Puesta en marcha de nuestro proyecto
Para la puesta en marcha de nuestro proyecto/API, deberemos seguir los siguientes pasos:

* Lo primero de todo es disponer de las herramientas necesarias en nuestro ordenador para poder abrir el proyecto y ejecutarlo.
	* Disponer de un entorno de desarrollo. Recomendamos Visual Studio Code.
	* Instalar Node.js. La version de Node utilizada en nuestro proyecto ha sido la v14.15.1
	* Instalar MongoDB o tener acceso a él desde nuestro ordenador. Podriamos trabajar también  con un Mongo en el Cloud.

* En segundo lugar clonaremos el proyecto original en una carpeta local de nuestro Mac, PC Windows o Linux. [Este es el enlace](https://github.com/JosepCristobal/Nodepop_WebX_Avanzado_PT.git)
* Una vez lo tengamos en nuestra carpeta, abriremos una ventana de comandos y nos situaremos en la carpeta de nuestro proyecto (./nodepop).
* Situados en el driectorio nodepop, ejecutaremos el comando "npm install"

		jcm@MacBook-Pro-de-Josep nodepop % npm install
		audited 419 packages in 2.057s

		59 packages are looking for funding
  		run `npm fund` for details

		found 0 vulnerabilities
* Con ello conseguiremos instalar todas las dependencias necesarias para que nuestro proyecto funcione.
* El siguiente paso es crear en la raiz de nuestro proyecto un nuevo fichero, que lo nombraremos como .env y dentro definiremos variables de entorno. En nuestro proyecto debería quedar así:

		MONGODB_CONNECTION_STR = conexión BBDD
		JWT_SECRET= Sectret
* El primero pertenece a la cadena de conexión a MongoDB.
* El segungo, deberemos crear un string que servirá de semilla para generar nuestros tokens de usuario.
* Ahora deberíamos verificar que tenemos la BBDD MongoDB levantada y accesible desde nuestro ordenador. Si la tenemos en local, posiblemente la tengamos que arrancar de forma manual.
* Si fuera el caso, deberíamos abrir una ventana de comandos o terminal nuevo y situarnos en el directorio donde se encuentra nuestra BBDD. Si es la primera vez que accedemos a nuestra BBDDD, es recomendable crear una carpeta para almacenar nuestros datos. En nuestro caso hemos creado a partir de la carpeta principal de Mongo, una subcarpeta llamada data y dentro de ella otra llamada db, quedando el directorio estructurado así:

		/mongodb-macos-x86_64-4.4.3/data/db
		
* A continuación, debemos arrancar nuestra BBDD y situados dentro de la carpeta principal de mongo, ejecutamos el siguiente comando:

		./bin/mongod --dbpath ./data/db
		
* Una vez arrancado nuestro MongoDB, deberemos ir a nuestro proyecto y cambiar un par de valores de nuestras variables de configuración.

	* Deberemos editar ./local_config.js si estamos trabajando con varios servidores
	
				module.exports = {
	    			anuncios: {
	      			imagesURLBasePath: 'http://localhost:3000/images/anuncios/',
	      			baseUrlPath: 'http://localhost:3000/'
	    			}
  				};
  				
		* imagesURLBasePath: pertenece a la ruta donde vamos a almacenar las imágenes de nuestro anuncios. En este caso, solo cambiaríamos 'http://localhost:3000' para adaptarla a la ruta de nuestro ordenador o de la red local.
		* baseUrlPath: Es la ruta base de nuestro servicio. Haríamos el cambio al igual que hemos hecho en el punto anterior.
	* A continuación editaremos ./lib/connectMongoose.js que es donde tenemos la cadena de conexión a nuestra BBDD MongoDB. Si trabajamos en local, este paso no sería necesario.

			mongoose.connect('mongodb://localhost/cursonode',{
	    		useNewUrlParser: true,
	    		useUnifiedTopology: true
			});
	* Nuestro servidor dará el servicio a través de puerto 3000, si queremos cambiarlo por algun motivo, lo deberemos hacer en ./bin/www. En nuestro caso no tenemos ninguna variable de entorno declarada referente al puerto, por lo tanto si queremos cambiarlo solo deberemos cambiar el 3000 por el que queramos.

			var port = normalizePort(process.env.PORT || '3000');
			
* Con todos estos pasos, casi tenemos nuestro servicio a punto de arrancar. Para facilitar la puesta marcha inicial, hemos creado un script para inicializar y cargar nuestra BBDD con unos anuncios de prueba y dos usuarios nuevos. Para ejecutarlo deberemos hacerlo a través de la ventana de comandos, nos situaremos en la raiz de nuestro proyecto nodepop y ejecutaremos el siguiente comando:

		jcm@MacBook-Pro-de-Josep nodepop % npm run installDB
		
	* Y si el resultado es el siguiente, es que todo ha salido bien y ya tendremos datos en nuestra base de datos.
	
			Conectado a MongoDB en cursonode
			success borrar anuncios: true
			Fin de proceso
		
* Para entornos de desarrollo y pruebas arrancaremos el servicio utilizando Nodemon ejecutando el siguiente comando.

		jcm@MacBook-Pro-de-Josep nodepop % nodemon run env
		
*  Si todo ha salido como esperábamos, ya tenemos nuestro servicio levantado a punto de ser consumido.
*  Ahora deberíamos levantar nuestro microservicio para hacer la transformación de imágenes y crear los thumbnails. Importante, debemos abrir otro terminal para ejecutarlo.

		npm run thService
*  Con todos estos pasos deberíamos tener tres terminales abiertos, uno con la aplicación levantada, otro con MongoDB levantado y un tercero con el microservicio a la escucha.

## Funcionalidades y uso de nuestra API

Una vez levantado nuestro servicio, podemos empezar a consumirlo.

### Consulta de anuncios
Tenemos dos partes diferenciadas:

* La primera sería una página html donde podremos acceder a la consulta de los anuncios y visualizar su resultado en un entorno web agradable.
* La segunda parte sólo nos retornará información, según los filtros aplicados, en formato JSON y estará especialmente diseñada para responder a peticiones de entornos que consumen datos (IOS, Android, otras Webs, etc.). También nos permitirá la creación de nuevos anuncios.
* Los filtros que podemos aplicar en ambas consultas son iguales, por lo que pasamos a definirlos.
* En nuestro proyecto los filtros de las consultas irán todas en la query (url).
* La base para la consulta, en nuestro caso que trabajamos en local y por el puerto 3000, será la siguiente:
	* Para la página html: 
	
			http://localhost:3000/?
	* Para el servicio JSON: 
	
			http://localhost:3000/apiV1/anuncios/?
	* Si queremos consultar todos los datos, obviaremos la barra y el intrrogante final.
	* En el caso de combinar diferente filtros, estos los concateneremos poniendo & entre ellos.
* Podremos filtrar por los siguiente conceptos:
	* nombre : Nombre del producto a buscar. La búsqueda se hará por las palabras que empiecen por el valor buscado y no tendrá en cuenta si son mayúsculas o minúsculas.
		* nombre=Zapatillas
	* venta : Si es una venta será true y si es intención de compra será false
		* venta=true
	* precio : es el precio de venta si venta = true y el precio que está dispuesto a pagar un comprador por un producto si venta es false.
		* El precio lo podemos consultar por diferentes criterios.
			* precio=50.8 	(Sería un precio exacto. Si hay decimales el separador será el .).
			* precio=50-80	(Precio entre 50 y 80, ambos incluidos).
			* precio=-50		(Precio menor o igual a 50).
			* precio=50-		(Precio mayor o igual a 50)
	* tags : Clasificación del anuncio según unos tags predefinidos. En nuestro caso los tags predefinidos son : work, lifestyle, motor y mobile.
		* tags=work (Para un solo tag)
		* tags=work&tags=motor ( Si son dos o más tags los concatenaremos con &).
* Podemos añadir más filtos a nuestra consulta que afectan a la paginación, ordenación y campos a visualizar. Siempre los concatenados con &.
	* limit : Nos retornará el máximo de registros indicados.
		* limit=50
	* skip : Nos devolverá a partir del registro indicado.
		* skip = 50
	* Con la combinación de "skip" y "limit" conseguiremos la paginación de registros.
	* fields : Podemos definir que campos queremos y cuales no. En el caso del _id nos lo devuelve por defecto y si queremos obvialo, lo definiremos como -_id
		* fields=nombre precio -_id  (Nos devolvera los registros con el valor nombre, precio i sin el _id)
	* sort : Ordena los registros por el o los campos que le indiquemos. Con - ordenará descendentemente.
		* sort=-precio (Nos ordenará por precio descendentemente).
	* Todos los filtros vistos hasta ahora se pueden combinar total o parcialmente.
	* Criterio para una consulta de ejemplo: 
		* Precio >= 50
		* Registros máximos a obtener = 20
		* tags buscados = lifestyle y motor
		* Buscamos articulos en venta, venta = true
		* Y queremos que nos devuelva nombre, precio, foto, tags y que excluya el _id
		* El %20 es para rellenar los espacios en blanco
	* Ejemplo de consulta en nuestra página html. En la nueva versión hemos añadido al principio de cada anuncio un thumbnail de la imagen principal.
	* La autenticación no afecta a la parte web.
	* En esta versión hemos incluido la internacionalización. Hemos incluido en la parte web un selector de idiomas interactivo.
			
			http://localhost:3000/?precio=50-&limit=20&tags=lifestyle&tags=motor&venta=true&fields=nombre%20precio%20foto%20tags%20-_id

	* Este mismo ejemplo para la consulta a nuestra API:
	
			http://localhost:3000/apiv1/anuncios/?precio=50-&limit=20&tags=lifestyle&tags=motor&venta=true&fields=nombre%20precio%20foto%20tags%20-_id

* En esta versión hemos introducido la autenticación a través de token JWS y afecta a todas las llamadas que hacemos al API.
* El token lo podemos incluir en la **_query-string o bien en el body_**

* Todas estas consultas se ha realizado con el método "GET" y los parametros se han pasado a través de la url.

Resutado de la consulta a la página html:
<p align="center">
<img src="https://github.com/JosepCristobal/Nodepop_WebX_Avanzado_PT/blob/master/nodepop/public/images/ResultSearchHtml.png?raw=true" alt="Resultado página html con filtro" width="500"/>
</p>

Resultado de la consulta a nuesta API:
<p align="center">
<img src="https://github.com/JosepCristobal/Nodepop_WebX_Avanzado_PT/blob/master/nodepop/public/images/ResultSearchAPI_1.png?raw=true" alt="Resultado API con filtro" width="500"/>
</p>

Muestra de todos los campos que podemos retornar desde la API:
<p align="center">
<img src="https://github.com/JosepCristobal/Nodepop_WebX_Avanzado_PT/blob/master/nodepop/public/images/ResultSearchTotAPI.png?raw=true" alt="Resultado API sin filtro" width="500"/>
</p>


### Consulta de tags
Podemos consultar todos los tags de clasificación disponibles para los anuncios. En este caso no hay parámetros, la consulta es directa como se ve en el ejemplo siguiente:

	http://localhost:3000/apiv1/anuncios/tags
	
Resultado en formato JSON de los tags disponibles:
<p align="center">
<img src="https://github.com/JosepCristobal/Nodepop_WebX_Avanzado_PT/blob/master/nodepop/public/images/TagsDisponibles.png?raw=true" alt="Tags disponibles" width="200"/>
</p>


### Validación de tags
Hemos desarrollado una validación de tags admitidos. Esta validación la utilizamos a nivel interno en nuevas altas de anuncios, pero tambien la podemos invocar desde el exterior como una funcionalidad más.

Utilizamos el método GET, pero los parámetros se pasan por el body, por consiguiente la consulta sólo la podremos hacer con Postman u otro programa similar o bien por código.
En nuestro caso utilizaremos Postman.

El resultado que nos retornará será un status 200 y result: OK o bien en el supuesto de que hayamos pasado tags no permitidos, nos devolverá un status 404 y error: (con todos los tags no coincidentes).

	http://localhost:3000/apiv1/anuncios/tagsValidate

Resultado de los tags validados con Postman con retorno de error:
<p align="center">
<img src="https://github.com/JosepCristobal/Nodepop_WebX_Avanzado_PT/blob/master/nodepop/public/images/TagsValidate.png?raw=true" alt="Tags disponibles" width="500"/>
</p>

### Autenticación de usuarios
Como ya se ha comentado, en esta versión hemos introducido el concepto de seguridad y para ello todas la llamadas al API deben ser con autenticación. Para ello utilizaremos un token JWS que nos facilitará nuestra aplicación previa validación de nuestro usuario y contraseña.
Este token lo deberemos acompañar en la query string o bien el el body (token=miToken), en todas las llamadas que hagamos al API.
Para poder hacer las pruebas, en la carga inicial de datos, se generarán dos usuarios.

		{
        email: 'pepe@pepe.com',
        password: await User.hashPassword('1234')
      },
      {
        email: 'josep@josep.com',
        password: await User.hashPassword('1234')
      }

Validación de usuario:

<p align="center">
<img src="https://github.com/JosepCristobal/Nodepop_WebX_Avanzado_PT/blob/master/nodepop/public/images/Valida_RetornaToken.png?raw=true" alt="Tags disponibles" width="500"/>
</p>



### Alta de nuevos anuncios
Las altas de nuevos anuncios las realizamos con el método POST y los valores necesarios los pasamos a través de body, por consiguiente la petición de altas sólo las podremos hacer con Postman u otro programa similar o bien por código.
En nuestro caso utilizaremos Postman.
Todas las peticiones de alta requieren de un token que pasaremos a través de la query string o bien en el body con el nombre token=ValorToken

Los datos y su tipología para realizar el alta de nuevos anuncios son los siguientes:

* nombre : String y campo obligatorio.
* precio : numérico
* venta : true o false
* foto : String
* tags : String y solo se aceptan valores permitidos.
* foto : file

Hay un sistema de validación en el API que:

* En el supuesto de datos no permitidos, nos devolverá un status 422 y un Json con errors: {Todos los errores encontrados} 
* En el supuesto que sea todo OK, nos retornara un status 201 y un Json con result: {Datos del anuncio creado}
* Si el error está en el token, nos devolverá un error 401 con el detalle del error.

Respuesta en el supuesto de datos erroneos en el alta de un nuevo anuncio:
<p align="center">
<img src="https://github.com/JosepCristobal/Nodepop_WebX_Avanzado_PT/blob/master/nodepop/public/images/Alta_Error.png?raw=true" alt="Tags disponibles" width="500"/>
</p>

Respuesta cuando el alta de un nuevo anuncio es OK:
<p align="center">
<img src="https://github.com/JosepCristobal/Nodepop_WebX_Avanzado_PT/blob/master/nodepop/public/images/AltaConFoto.png?raw=true" alt="Tags disponibles" width="500"/>
</p>

### Módulo público

https://www.npmjs.com/package/pepe-distcalc

Este es el enlace que nos permite acceder a nuestro módulo público que hemos publicado en NPM.
El tiempo se ha terminado y no he podido terminarlo.
La finalidad del módulo es calcular la distancia entre dos puntos georeferenciados.
Introducimos las coordenadas del punto A y punto B y la intención es que el módulo nos devuelva la distancia en Km en linea recta entre los dos puntos. Además nos tiene que identificar la ciudad, código postal, pais y calle de cada uno de los puntos.


# Despliegue de la aplicación en servidor de acceso público.
### Práctica del módulo configuración de servidores y despliegue de aplicaciones.
Para poder hacer pruebas en un entorno real y siguiendo las indicaciones del módulo, en las siguientes url
podremos ejecutar y evaluar la aplicación/API:

 #### Páginas estáticas:
  * https://pepetrans.com
  * https://www.pepetrans.com
  * Ip pública : http://18.169.74.133
 
 #### Acceso API Nodepop
  * https://node.pepetrans.com
 
 #### Acceso a página estatica para verificar cabecera.
 Ejemplo directo:
   https://node.pepetrans.com/images/anuncios/kawa.jpg   
 cualquier imágen de anuncios de https://node.pepetrans.com
 css de react en www.pepetrans.com.
   
  Para más información consultar en el  [README Despliegue de servidores](https://github.com/JosepCristobal/srv_confServWebX_PT) del proyecto.




### Conclusiones finales
Creo que con este trabajo se han cubierto todos los requisitos básicos de la práctica y me ha sabido mal no poder abordar uno de los extras que nos pedían, implantación de testing en nuestro proyecto.

Como ya comenté en la práctica anterior de backend, soy más de back que de front.

Bajo mi opinión personal, creo que el backend es la parte más importante de una aplicación, sin ella nada funciona. Toda la funcionalidad de la mayoría de aplicaciones web, móviles y otros servicios dependen de este elemento tan importante.

Esta práctica me ha ayudado a asentar muchos conocimientos aprendidos en clase y otros que he aprendido a raiz de la búsqueda de información para abordar según que partes de la practica.
Ha sido un ejercicio muy interesante y realmente he disfrutado haciendola.

Muchas gracias Javier por todo.

Un placer, como siempre!








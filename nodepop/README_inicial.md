# Práctica WEB-API/Node.js/MongoDB

## Objetivo
Desarrollar una API que se ejecutará en el servidor de un servicio de venta de artículos de segunda mano llamado Nodepop. Esta API podrá ser utilizada y consumida por desarrolladores web, IOS, Android, etc.

El servicio mantiene anuncios de compra o venta de artículos y deberá permitir diferentes tipos de búsqueda, por cosiguiente la API a desarrollar deberá proveer los métodos necesarios para tal funcionalidad.

## Consideraciones generales
1. Cada anuncio deberá tener los siguientes datos:
	* Nombre del artículo. Un anuncio siempre tendrá un solo artículo.
	* Si el artículo se vende o se busca.
	* Precio. Será el precio del artículo en caso de ser una oferta de venta. En caso de que sea un anuncio de "se busca", será el precio que el solicitante estaría dispuesto a pagar.
	* Foto del artículo. Cada artículo tendrá solo una foto.
	* Tags del anuncio. Podrá contener uno o varios de estos cuartro: work, lifestyle, motor y mobile.

2. Operaciones que deberá tener la API a crear.
	* La lista de anuncios debe tener la posibilidad de paginación.
	* La posibilidad de filtrar por tag.
	* Poder filtrar por tipo de anuncio, venta o búsqueda.
	* Posibilidad de filtro por rango de precio, mínimo y máximo.
	* Filtrado por nombre de artículo, con la posibilidad de filtrar que el nombre del artículo empiece con el dato de búsqueda.
	* Lista de tags existentes.
	* Creación de un anuncio.

3. Los sistemas donde se desplegará la API utilizarán MongoDB como base de datos.
4. El site donde se despliegue deberá tener, además de la API, una página frontend que muestre una lista de anuncios con filtros en su página principal. Obtendrá información de la base de datos usando los modelos y la mostrará.

## Desarrollo del proyecto
En el siguiente enlace, describimos paso a paso todo el recorrido que hemos seguido en el desarrollo de nuestro proyecto:

[Paso a paso](https://github.com/JosepCristobal/Nodepop_WebX_PT/blob/master/README_pasos.md)

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

* En segundo lugar clonaremos el proyecto original en una carpeta local de nuestro Mac, PC Windows o Linux. [Este es el enlace](https://github.com/JosepCristobal/Nodepop_WebX_PT.git)
* Una vez lo tengamos en nuestra carpeta, abriremos una ventana de comandos y nos situaremos en la carpeta de nuestro proyecto (./nodepop).
* Situados en el driectorio nodepop, ejecutaremos el comando "npm install"

		jcm@MacBook-Pro-de-Josep nodepop % npm install
		audited 419 packages in 2.057s

		59 packages are looking for funding
  		run `npm fund` for details

		found 0 vulnerabilities
* Con ello conseguiremos instalar todas las dependencias necesarias para que nuestro proyecto funcione.
* Ahora deberíamos verificar que tenemos la BBDD MongoDB levantada y accesible desde nuestro ordenador. Si la tenemos en local, posiblemente la tengamos que arrancar de forma manual.
* Si fuera el caso, deberíamos abrir una ventana de comandos o terminal nuevo y situarnos en el directorio donde se encuentra nuestra BBDD. Si es la primera vez que accedemos a nuestra BBDDD, es recomendable crear una carpeta para almacenar nuestros datos. En nuestro caso hemos creado a partir de la carpeta principal de Mongo, una subcarpeta llamada data y dentro de ella otra llamada db, quedando el directorio estructurado así:

		/mongodb-macos-x86_64-4.4.3/data/db
		
* A continuación, debemos arrancar nuestra BBDD y situados dentro de la carpeta principal de mongo ejecutamos el siguiente comando:

		./bin/mongod --dbpath ./data/db
		
* Una vez arrancado nuestro MongoDB, deberemos ir a nuestro proyecto y cambiar un par de valores de nuestras variables de configuración.

	* Deberemos editar ./local_config.js
	
				module.exports = {
	    			anuncios: {
	      			imagesURLBasePath: 'http://192.168.10.114:3000/images/anuncios/',
	      			baseUrlPath: 'http://192.168.10.114:3000/'
	    			}
  				};
  				
		* imagesURLBasePath: pertenece a la ruta donde vamos a almacenar las imágenes de nuestro anuncios. En este caso, solo cambiaríamos 'http://192.168.10.114:3000' para adaptarla a la ruta de nuestro ordenador o de la red local.
		* baseUrlPath: Es la ruta base de nuestro servicio. Haríamos el cambio al igual que hemos hecho en el punto anterior.
	* A continuación editaremos ./lib/connectMongoose.js que es donde tenemos la cadena de conexión a nuestra BBDD MongoDB. Si trabajamos en local, este paso no sería necesario.

			mongoose.connect('mongodb://localhost/cursonode',{
	    		useNewUrlParser: true,
	    		useUnifiedTopology: true
			});
	* Nuestro servidor dará el servicio a través de puerto 3000, si queremos cambiarlo por algun motivo, lo deberemos hacer en ./bin/www. En nuestro caso no tenemos ninguna variable de entorno declarada referente al puerto, por lo tanto si queremos cambiarlo solo deberemos cambiar el 3000 por el que queramos.

			var port = normalizePort(process.env.PORT || '3000');
			
* Con todos estos pasos, casi tenemos nuestro servicio a punto de arrancar. Para facilitar la puesta marcha inicial, hemos creado un script para inicializar y cargar nuestra BBDD con unos anuncios de prueba. Para ejecutarlo deberemos hacerlo a través de la ventana de comandos, nos situaremos en la raiz de nuestro proyecto nodepop y ejecutaremos el siguiente comando:

		jcm@MacBook-Pro-de-Josep nodepop % node ./lib/install_db.js
		
	* Y si el resultado es el siguiente, es que todo ha salido bien y ya tendremos datos en nuestra base de datos.
	
			Conectado a MongoDB en cursonode
			success borrar anuncios: true
			Fin de proceso
		
* Para entornos de desarrollo y pruebas arrancaremos el servicio utilizando Nodemon ejecutando el siguiente comando.

		jcm@MacBook-Pro-de-Josep nodepop % nodemon run env
		
*  Si todo ha salido como esperábamos, ya tenemos nuestro servicio levantado a punto de ser consumido.



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
	* Ejemplo de consulta en nuestra página html
			
			http://localhost:3000/?precio=50-&limit=20&tags=lifestyle&tags=motor&venta=true&fields=nombre%20precio%20foto%20tags%20-_id

	* Este mismo ejemplo para la consulta a nuestra API:
	
			http://localhost:3000/apiv1/anuncios/?precio=50-&limit=20&tags=lifestyle&tags=motor&venta=true&fields=nombre%20precio%20foto%20tags%20-_id

* Todas estas consultas se ha realizado con el método "GET" y los parametros se han pasado a través de la url.

Resutado de la consulta a la página html:
<p align="center">
<img src="https://github.com/JosepCristobal/Nodepop_WebX_PT/blob/master/nodepop/public/images/ResultSearchHtml.png?raw=true" alt="Resultado página html con filtro" width="500"/>
</p>

Resultado de la consulta a nuesta API:
<p align="center">
<img src="https://github.com/JosepCristobal/Nodepop_WebX_PT/blob/master/nodepop/public/images/ResultSearchAPI_1.png?raw=true" alt="Resultado API con filtro" width="500"/>
</p>

Muestra de todos los campos que podemos retornar desde la API:
<p align="center">
<img src="https://github.com/JosepCristobal/Nodepop_WebX_PT/blob/master/nodepop/public/images/ResultSearchTotAPI.png?raw=true" alt="Resultado API sin filtro" width="500"/>
</p>


### Consulta de tags
Podemos consultar todos los tags de clasificación disponibles para los anuncios. En este caso no hay parámetros, la consulta es directa como se ve en el ejemplo siguiente:

	http://localhost:3000/apiv1/anuncios/tags
	
Resultado en formato JSON de los tags disponibles:
<p align="center">
<img src="https://github.com/JosepCristobal/Nodepop_WebX_PT/blob/master/nodepop/public/images/TagsDisponibles.png?raw=true" alt="Tags disponibles" width="200"/>
</p>


### Validación de tags
Hemos desarrollado una validación de tags admitidos. Esta validación la utilizamos a nivel interno en nuevas altas de anuncios, pero tambien la podemos invocar desde el exterior como una funcionalidad más.

Utilizamos el método GET, pero los parámetros se pasan por el body, por consiguiente la consulta sólo la podremos hacer con Postman u otro programa similar o bien por código.
En nuestro caso utilizaremos Postman.

El resultado que nos retornará será un status 200 y result: OK o bien en el supuesto de que hayamos pasado tags no permitidos, nos devolverá un status 404 y error: (con todos los tags no coincidentes).

	http://localhost:3000/apiv1/anuncios/tagsValidate

Resultado de los tags validados con Postman con retorno de error:
<p align="center">
<img src="https://github.com/JosepCristobal/Nodepop_WebX_PT/blob/master/nodepop/public/images/TagsValidate.png?raw=true" alt="Tags disponibles" width="500"/>
</p>


### Alta de nuevos anuncios
Las altas de nuevos anuncios las realizamos con el método POST y los valores necesarios los pasamos a través de body, por consiguiente la petición de altas sólo las podremos hacer con Postman u otro programa similar o bien por código.
En nuestro caso utilizaremos Postman.
Los datos y su tipología para realizar el alta de nuevos anuncios son los siguientes:

* nombre : String y campo obligatorio.
* precio : numérico
* venta : true o false
* foto : String
* tags : String y solo se aceptan valores permitidos.

Hay un sistema de validación en el API que:

* En el supuesto de datos no permitidos, nos devolverá un status 422 y un Json con errors: {Todos los errores encontrados} 
* En el supuesto que sea todo OK, nos retornara un status 201 y un Json con result: {Datos del anuncio creado}

Respuesta en el supuesto de datos erroneos en el alta de un nuevo anuncio:
<p align="center">
<img src="https://github.com/JosepCristobal/Nodepop_WebX_PT/blob/master/nodepop/public/images/Alta_Error.png?raw=true" alt="Tags disponibles" width="500"/>
</p>

Respuesta cuando el alta de un nuevo anuncio es OK:
<p align="center">
<img src="https://github.com/JosepCristobal/Nodepop_WebX_PT/blob/master/nodepop/public/images/AltaOK.png?raw=true" alt="Tags disponibles" width="500"/>
</p>




## Conclusiones finales

Creo que con este trabajo he cubierto todos los requisitos que se pedían en el enunciado de la práctica y el esfuerzo que he dedicado no ha sido poco.

Creo que la parte del backend es la parte más importate y la base para dar funcionalidad a cualquier aplicación web, dispositivo móvil o servicio a un cliente y por ello he querido asentar bien los conocimientos adquiridos en este módulo y he intentado darlo todo.
La práctica la he empezado de cero y como le dije a Alberto Casero en el módulo de introducción a Javascript, donde más se aprende es cuando te enfrentas solo a la práctica e intentas aplicar todo lo aprendido en clase y lo compelmentas buscando información adicional para mejorar tu proyecto.

Al final el tiempo se me ha agotado y me ha quedado pendiente el propósito de mejorar la presentación de la página htmlpero no ha podido ser.

Realmente ha sido una práctica muy interesante y me lo he pasado muy bien. He refrescado y he aprendido mucho realizándola.

Muchas gracias Javier por todo.

Un placer, como siempre!

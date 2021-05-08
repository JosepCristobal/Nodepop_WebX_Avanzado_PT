# Práctica Backend Avanzado
Detalle de todos los pasos que hemos seguido para el desarrollo de esta práctica de Node JS avanzado del Bootcamp Web X

## Inicio de la práctica de Desarrollo backend avanzado NodeJs-MongoDB
* En primer lugar, procedemos a clonar nuestro proyecto del módulo anterior de NodeJS y MongoDB fundamentos.[Practica de fundamentos.](https://github.com/JosepCristobal/Nodepop_WebX_PT.git)
* Ahora vamos a desarrollar la parte de la autenticación. Aquí vamos a utilizar JWT.
* Instalamos dotenv para poder acceder a las variables de entorno, de forma más fácil.

		npm i dotenv
 
* En la raiz de nuestro proyecto, creamos los ficheros .env y .env.example. El .env lo incluiremos dentro del .gitignore para que no suba a nuestro repositorio. El .env.example lo dejaremos como ejemplo de que variables de entorno hay que definir.
* Para que funcione el dotenv de forma correcta, añadimos en bin/www en la parte inicial de nuestro proyecto para que sea accesible desde todo nuestro API.

		require('dotenv').config()
* En el .env añadimos dos variables de entorno:
	* La primera hace referencia a la conexión a la Base de Datos
	
			MONGODB_CONNECTION_STR = conexión BBDD
	* La segunda hace referencia a la palabra secreta para la composición de los tokens para la autenticación.
			
			JWT_SECRET= Sectret
* Ahora instalamos el módulo de internacionalización i18n.

		npm install i18n
* Configuramos el fichero en lib/i18nConfigure.js para inicializar parámetros básicos.
* A continuación creamos la carpeta /locales en la raiz de nuestro proyecto que será donde se van a almacenar las diferentes definiciones para cada idioma.
* Continuamos con la parte de la autenticación.
* Para que el password no se guarde en claro en nuestra BBDD vamos a encriptarlo con bcrypt.

		npm install bcrypt
* Ahora creamos un modelo llamado User para gestionar y guardar los datos de usuarios en /models/User.js.
* Para gestionar la autenticación a través de JWT debemos instalar la librería de jsonwebtoken.

		npm install jsonwebtoken
* Creamos una nueva carpeta llamada controllers y dentro crearemos authControllers.js donde controlaremos la verificación y asignación de tokens.
* En nuestro app.js añadimos una nueva ruta en la sección de rutas del API

		app.post('/apiv1/authJWT, authController.postJWT
* Anteriormente hemos hecho un require del controlador.
* A continuación, modificamos el fichero que utilizamos para la carga inicial de datos lib/install_db.js, para añadir una nueva funcionalidad, la carga de 2 usuarios en la base de datos junto a los anuncios iniciales.
* Probamos la carga incial ejecutando el siguiente comando y verificamos que todo funciona correctamente.

		npm run installDB
* Hacemos la validación de un usuario y nos retorna un token válido. Las pruebas las realizamos a través de Postman.
* En /libs creamos jwtAuth.js que nos servirá para verificar que el token es correcto o no y lo incluiremos en las rutas para autorizar el acceso a las diferentes funcionalidades de nuestro API.
* Lo implementamos en nuestra ruta de /apiv1/anuncios en los métodos GET y POST. Verificamos que funciona correctamente.
* Creamos funcionalidad para averiguar el motivo cuando el token no sea válido. Si es por motivo de malformación o de caducidad.
* Creamos dos tipos de texto distintos para el mensaje que retornaremos cuando el token no sea válido y nos retorne un error.
* Damos por terminado el primer punto de la práctica de **Autenticación**
* Volvemos a retomar el tema de la internacionalización.
* En lib/i18nConfigure.js creamos la parametrización para el 'es' español, 'en' inglés.
* Empezamos a crear las variables y los textos para los dos idiomas.
* Añadimos un selector de idioma en nuestra página html. Lo creamos de forma interactiva para que si añadimos un nuevo idioma, no tengamos que cambiar nuestro código y se añada de forma dinámica.
* Aplicamos un href a cada uno y vamos a utilizar las cookies para que se perpetúe el idioma seleccionado durante toda la 'session'.
* Creamos el link.
* Ahora modificamos nuestra app.js y creamos 
		
		app.use('/changue-locale', require('./routes/change-locale'));
* Creamos en /routes/change-locale.js una ruta donde añadiremos una cookie con el idioma seleccionado y posteriormente haremos una redirección a la misma página de la que venimos. Utilizaremos  'referer' para saber de donde venimos.
* La cookie que creamos la llamaremos 'nodepop_locale'.
* Editamos i18nConfigure.js y añadimos otro parametro más que será el cookie:'nodeapi_locale'
* Ahora en change_locale.js vamos a redirigir a la página de donde venimos.
* Debemos incluir en app.js la siguiente linea de código para inicializarlo.

		// Inicializamos la internacionalización
		app.use(i18n.init);
* Probado y funcionando.

		res.redirect(req.get('referer'));
* **Internacionalización** terminada
* Ahora vamos a abordar la subida de imágen.
* Utilizaremos la librería multer para ayudarnos en la subida.

		npm install multer
* Buscamos información y procedemos a ello.
* El nombre de la imagen será una composición de hora actual mas el nombre original de la imagen con extensión incluida. Con ello conseguiremos que no tengamos imágenes con nombres duplicados.
* Subiremos la imagen y guardaremos el nombre en nuestra BBDD junto a los datos del anuncio.
* A través de multer limitaremos el tamaño, el tipo y convertiremos el nombre original de la imagen en minúsculas.
* Los tipos de imagen admitidos son: .png, .jpg, .jpeg, .gif.
* La foto no es obligatoria, en caso de no existir, en la BBDD guardaremos una ruta a una imagen genérica.
* La mayor parte del código está en routes/apiv1/anuncios.js
* **Subida de imagen** concluido.
* Ahora nos toca abordar la generacion del thumbnail a través de un microservicio.
* Para ello, vamos a utilizar la librería cote.

		npm install cote
* Cote es una librería que nos permite construir microservicios on cero configuración.
* Vamos a crear nuestro microservicio en una carpeta dentro de nuestro proyecto, solo por tema de comodida, pero hay que dejar claro que este no pertenece al proyecto nodepop.
* Creamos en la raiz de nuestro proyecto la carpeta microservices y dentro, el microservicio thumbnail.js.
* Modificamos nuestro package.json para añadir una llamada directa al arranque de nuestro microservicio.
* Ahora para arrancarlo, lo haremos con la siguiente instrucción:

		npm run thService
* La configuración de la llamada al microservicio la haremos en routes/apiv1/anuncios.js
* Previa carga de la libreria cote, hacemos la llamada de la siguiente forma:

		requester.send({
            type: 'convertir imagen',
            nameImage : nameImage,
        }, resultado =>{
            if (!resultado) {
                console.erro('Error en microservice al crear el thumbnail')};
        })
* En nuestro microservicio, para tratar la imagen y poder reducirla, utilizamos la librería jimp.

		npm install jimp
* Lo dejamos preparado para reducir la imagen al tamaño en pixels que le indiquemos por parámetro y el nombre.
* En la reducción de la imagen vamos a conservar las proporciones de ella, para ello solo vamos a modificar la altura y el ancho haremos que jimp lo ajuste autimáticamente.
* La nueva imagen creada se guardará en la misma ruta que la original, renombrando el nombre de archivo de la siguiente forma:

		Imagen original: 	TeslaM.jpg
		Imagen transforada: TeslaM_thumbnail.jpg
* Hacemos todas las pruebas y funciona todo de forma correcta.
* En la BBDD no guardaremos la ruta de thumbnail, lo deduciremos añadiendo el sufijo **_thumbnail **al nombre del original.
* Ahora procedemos a modificar nuestro index.html para poder mostrar nuestros thumbnails en los anuncios.
* También modificamos nuestro index.js para hacer la conversión de nombres de nuestros thumbnails.
* Para hacer el test inicial, hemos copiado y renombrado las imágenes existentes, para crear las que consideramos thumbnails para poder hacer las pruebas. Éstas no se han reducido de tamaño. Todas las que suban a partir del API si que serán reducidas.
* Subida de imágenes y creación de thumbnails a través de microservicio completada y funcionando.
* La parte de test, queda pendiente.
* Final de la práctica.


[Volver a README.md](https://github.com/JosepCristobal/Nodepop_WebX_Avanzado_PT/blob/master/README.md)
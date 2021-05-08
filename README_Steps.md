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
* 






























[Volver a README.md](https://github.com/JosepCristobal/Nodepop_WebX_Avanzado_PT/blob/master/README.md)
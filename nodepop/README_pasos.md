# Nodepop_WebX_PT
[Volver al README.md](https://github.com/JosepCristobal/Nodepop_WebX_PT#desarrollo-del-proyecto)

## Inicio de la práctica de Desarrollo backend NodeJs MongoDB

- Creación de la carpeta de proyecto e inicialización de git
- Creación del fichero .gitignore
- Creamos proyecto con npx express-generator nodepop.
- Ejecutamos npm install para cargar las dependencias.
- Hacemos un commit inicial de proyecto y un push.
- Instalamos nodemon en nuestro proyecto local para arrancar en modo desarrollo.
- npm i nodemon
- Instalamos cross-env para compatibilidad con variables de entorno en diferentes S.O.
- npm i cross-env
- Añadimos "dev": "cross-env PORT=3000 NODE_ENV=development DEBUG=nodepop:* nodemon" en Scripts de package.json.
- Para arrancar el servidor, lo haremos con el comando npm run dev.
- Para más comodidad, hemos instalado nodemon que nos permite tener el servidor arrancado permanentemente, reiniciándose cada vez que modificamos algo en nuestro código y guardamos.
- Arrancando con nodemon : nodemon run dev.
- Instalamos ESLint para mejorar nuestra calidad de código. Esta herramienta no ayudará en esta labor../node_module
- Inicializamos eslint con el comando $./node_modules/.bin/eslint --init
- Información extraida de "https://lenguajejs.com/javascript/caracteristicas/eslint/"
- Instalamos la guia de estilo standard con  npm i standard
- Iniciamos eslint para nuestro proyecto.
- Si queremos verificar un fichero solamente, podemos ejecutar npx eslint ./routes/index.js
- Vamos a estructurar un poco nuestro proyecto creando diferentes directorios.
- Dentro de routes, creamos un directorio con el el nombre de apiv1 para definir nuestros paths. lib para librerías. models para nuestros modelos.
- Instalamos accesos a MongoDB npm install mongodb.
- Instalamos Mongoose npm install mongoose. Esta librería nos ayudará a operar con la BBDD MongoDB.
- Configuramos nuestro app.js Para controlar errores, rutas, cargas iniciales, etc.
- Tratamos la devolución de errores en el app.js. Si el error se ha producido en una petición al API, el retorno será en formato Json.
- Instalamos express-validator para ayudarnos a la validación de datos que hayamos recibido en nuestras peticiones al API. npm install express-validator.
- Creamos un fichero header.html para incluirlo en nuestro index.html
- Para arrancar la BBDD de MongoDB de forma manual, nos situamos en el directorio donde se encuentra nuestro motor de BBDD y ejecutamos el siguiente comando: ./bin/mongod --dbpath ./data/db
- Creamos la definición y validación de los tags de anuncios. Hemos optado por un objeto tipo enum congelado y hacemos la validación devolviendo los tags erroneos.
- Empezamos a crear el método PUT para dar de alta un nuevo anuncio. Pruebas realizadas sin validación de tipos de dato.
- Ahora toca programar toda la validación del anuncio para insertarlo con los parámetros correctos.
- Para consumir API de terceros, utilizaremos la libreria axios npm install axios.
- La llamaremos desde nuestro index.js principal para servir datos a nuestra página html de presentación inicial.
- Empezamos a mostrar todos los tags dados de alta en nuestro modelo Anuncio.
- Construimos la estructura para hacer consultas por diferentes criterios (contenido).
- Aplicamos filtros por rango de precios, venta o compra.
- Mostrar los datos en la página index.html utilizando axios y la query string que nos puedan pasar en la url
- Añadimos más datos como los criterios de búsqueda y la foto del articulo. Para la practica daremos por supuesto que la tenemos guardada en local.
- Generamos proceso de carga de datos a través de un JSON que hemos preparado en un fichero.
- Carga de imágenes para los anuncios en images/anuncios.
- Ahora ya hemos terminado con los requisitos de la práctica, empezamos con las validaciones de entrada.
- Instalamos express-validator
- Implementamos la validación de la entrada de nuevos anuncios, incluidos los tags permitidos.
- Creamos la carpeta local_config para guardar definiciones de objetos que posteriormente utilizaremos.
- Para guardar url base de las imágenes, utilizamos la propiedad "imagesURLBasePath" del objeto creado anteriormente.
- En consulta de anuncios, una vez obtenemos el resultado, modificamos la propiedad .foto concatenando el valor imagesURLBasePath al nombre de imagen que tenemos.
- Con la acción anterior, si cambiaramos de ubicación nuestro servidor, sólo tendríamos que modificar nuestra propiedad y no todo el contenido de .foto de toda la BBDD.
- Probar toda la funcionalidad de nuestra API.
- Terminar de documentar todo el proyecto en README.md y en README_pasos.md.
- Si nos da tiempo, mejoraríamos la visualización de nuestra página html.
- Vamos a realizar un cambio de estrategia en la parte del index.js/index.html principal. Según una aclaración de Javier (Slack 07/02/2021 13:13).
- En el apartado de visualización de una página (frontend) que muestre una lista de anuncios con filtros en su página principal, inicialmente habíamos optado por utilizar Axios y acceder a los datos de nuestros anuncios a través de invocar y consumir nuestra propia API. Con la aclaración de Javier, hemos renombrado los index a indexV0 y hemos creado un nuevo index.js y un nuevo index.html que extraen la información directamente sin pasar por nuestra API. Estos últimos son los que están activos en el proyecto y los renombrados, aunque no se utilizan, pero los dejamos como ejemplo de una segunda opción que puede funcionar.
- Continuamos con la documentación.
- Documentación terminada.


[Volver al README.md](https://github.com/JosepCristobal/Nodepop_WebX_PT#desarrollo-del-proyecto)



# REST Server con Express

API RESTFUL realizada con el Framework Express de NodeJS, en cual empleamos bastantes funcionalidades, las cuales van desde CRUDS simples, autenticación con JWT hasta subida de archivos.
Los temas desarrollados en el proyecto son:

1. Rutas, controladores y modelos.
2. Base de datos con MongoDB
3. CRUDs de diferentes colecciones
4. Autenticación
5. Autorización
6. Middlewares
7. Carga de archivos

## Como usar el proyecto

Lo primero que se debe hacer es clonar el repositorio:

```bash
git clone https://github.com/chicho69-cesar/rest-server.git
```

Después se instalan las dependencias del proyecto, en este caso se utilizo pnpm con package manager del proyecto.

```bash
pnpm install
```

Generamos las variables de entorno requeridas y especificadas en el archivo .example.env. En el cual debemos de tener una cadena de conexión a nuestra base de datos en MongoDB, un secret key para firmar los JWT, un Google client id y un secret id para la autenticación con Google, los cuales se pueden obtener fácilmente en la consola de Google Cloud y por ultimo el cloudinary url para la subida de las imágenes a cloudinary.

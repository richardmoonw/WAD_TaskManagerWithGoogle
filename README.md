## ¿Qué es Loopy? 
Somos una solución increíblemente fácil, flexible e intuitiva para administrar tus proyectos. 
Haz que tu gestión sea una tarea mucho más divertida con Loopy.

# Levantar el servidor

## Prerrequisitos
1. Instalar NodeJs: https://nodejs.org/es/
2. Instalar MongoDB (asegurarse de instalar también MongoDB Compass) https://www.mongodb.com/try/download/community
3. Instalar Yarn https://classic.yarnpkg.com/en/docs/install#windows-stable

## Pasos
Clonar el repositorio en nuestro equipo.

### Levantar el Front-End

Abrimos una terminal en la carpeta del proyecto .\WAD_TaskManagerWithGoogle\loopy-front

Ejecutamos el comando `yarn init` para que inicialize el proyecto, dejamos las opciones en default dando enter.

Se ejecuta el comando `yarn install` para que se instalen todas las librerias necesarias para arrancar el proyecto.

Finalemente, se ejecuta el comando `yarn start` para levantar el Front-End de la aplicación en http://localhost:3000/

### Levantar el Back-end

Abrimos una terminal en la carpeta del proyecto .\WAD_TaskManagerWithGoogle

Después corremos el comando `yarn init` que inicializara el proyecto, dejamos las opciones en default dando enter.

Luego corremos el comando `yarn install` para que instale todas las librerias necesarias.
Después el levantar el servidor varía si tu sistema operativo es Windows o Linux/MacOS.

- Windows: Ejecuta el comando `set PORT=3001 && yarn start`
- Linux/MacOs: Ejecuta el comando `PORT=3001 yarn start`

Esto levantará el servidor del Back-End con la base de datos de MongoDB en el puerto 3001.

## Problemas Comunes

- Levantar el servidor del back-end únicamente con el comando `yarn start` ya que estó lo inicializa en el puerto 3000 y entra en conflicto con el Front-End.
- No tener instalado Yarn, en caso de no tener Yarn en tu dispositivo, tu terminal no reconocerá ninguno de los comandos anteriores.
- No tener instalado MongoDB Server, debido a que la base de datos se esta trabajando en Mongo, es necesario instalar MongoDB Comunity Server y, en caso de que se quiera vizualizar el contenido, MongoDB Compass. El Back-End mandará una excepción si se trata de levantar sin el servidor de Mongo instalado en el dispositivo.

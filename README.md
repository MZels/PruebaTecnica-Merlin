# SOLUCIÓN DE PRUEBA TÉCNICA (QA dev)

En este repositorio se resuelven los ejercicios 2 y 3 de la prueba técnica propuesta.
Los enunciados son los siguientes:

### Ejercicio 2: Automatización de una web

Debes realizar una automatización consistente en:

1. Buscar en Google la palabra “automatización”
2. Buscar el link de la Wikipedia resultante
3. Comprobar en qué año se hizo el primer proceso automático
4. Realizar un screenshot de la página de la Wikipedia

### Ejercicio 3: Tratamiento de datos en APIs

En este enlace encontrarás la documentación de la API de una tienda de mascotas: https://petstore.swagger.io/

1. Crea tu usuario mediante petición HTTP y posteriormente recupera sus datos llamando al servicio correspondiente.
2. Recoge mediante petición HTTP, el JSON que retorna el endpoint /pet/findByStatus y lista mediante una función los nombres de las mascotas que se hayan vendido.
    - El formato de salida deberá estar formado por la tupla {id, name}. - Puedes utilizar la estructura de datos que prefieras.
3. Crea una clase cuyo constructor requiera de la estructura de datos anterior y realiza un método que pueda recorrerla para poder identificar cuantas mascotas se llaman igual.
    - Ejemplo de salida: {“William”: 11, “ Floyd”: 2} Como output, te pediremos el código (puedes separarlo en archivos como quieras) y los resultados de salida de los puntos anteriores.
- Recuerda que puedes utilizar el lenguaje que prefieras y cualquier mejora adicional será bien considerada

## Descripción de la solución propuesta:

Para la solución de esta prueba técnica se a elegido Cypress (javascript) como framework de automatización de pruebas.

## Requisitos previos

Antes la ejecución de este proyecto es necesario instalar las siguientes herramientas:

* Node.js v18.x (Entorno de ejecución para JavaScript) [Link](https://nodejs.org/)
* Cualquier herramienta de desarrollo software (IDE), por ejemplo: [Visual Studio Code](https://code.visualstudio.com/Download)

## Instrucciones de instalación

1. Crear una carpeta en la que clonar este repositorio
2. Clonar el repositorio: 

    > git clone https://github.com/MZels/PruebaTecnica-Merlin

### Instrucciones de Ejecución de las pruebas

1. Abrir un terminal en tu IDE de preferencia.
2. Situarse en la carpeta raíz del proyecto.
3. Abrir Cypress con el comando:

    > npx cypress open
   
4. Seleccionar la opción "E2E Testing".
5. Seleccionar el navegador a utilizar para las pruebas.
6. En la sección Specs, se mostrarán los dos ficheros de pruebas que resuelven la prueba técnica (uno para cada ejercicio):

    * ejecicio2.cy.js
    * ejercicio3.cy.js
   
7. Seleccionar el que se desea ejecutar (Cypress ejecutará las prueba de ese Spec en el navegador seleccionado)


## Autor

Miguel Núñez Zels


## Docs de referencia:

* [Web Oficial de Cypress](https://docs.cypress.io/guides)

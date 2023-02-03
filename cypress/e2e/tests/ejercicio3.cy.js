/// <reference types="cypress" />

/*
ENUNCIADO EJERCICIO 3:
----------------------------
1. Crea tu usuario mediante petición HTTP y posteriormente recupera sus datos llamando al servicio correspondiente.
2. Recoge mediante petición HTTP, el JSON que retorna el endpoint /pet/findByStatus y lista mediante una función los nombres de las mascotas que se hayan vendido.
- El formato de salida deberá estar formado por la tupla {id, name}. - Puedes utilizar la estructura de datos que prefieras.
3. Crea una clase cuyo constructor requiera de la estructura de datos anterior y realiza un método que pueda recorrerla para poder identificar cuantas mascotas se llaman igual.
- Ejemplo de salida: {“William”: 11, “ Floyd”: 2} Como output, te pediremos el código (puedes separarlo en archivos como quieras) y los resultados de salida de los puntos anteriores.
- Recuerda que puedes utilizar el lenguaje que prefieras y cualquier mejora adicional será bien considerada
*/

import { API } from '../../support/endpoints.js'
import {ListVerificator} from '../classes/ListVerificator.js'

const soldPetsFile ='../../downloads/soldPets.json'
const duplicatesFile = '../../downloads/duplicatedNames.json'
const status = "sold"

// Función que lista los nombres de las mascotas que se hayan vendido. Devuelve un Json de pares {"id": name}
function getIdNamePairs(list) {
    
    var petList = list
    var sales = []

    petList.forEach(pet => {
        var pets = {}
        pets[`${pet.id}`] = pet.name
        sales.push(pets)
    })

    cy.log('Mascotas vendidas:\n' + JSON.stringify(sales).replaceAll(',','\n'))
    return sales
}

describe('Ejercicio 3', function () {

    let userData
    let petsData

    before(function () {
        cy.fixture('user').then(function (user) {
            userData=user
        })
        cy.fixture('pets').then(function (pets) {
            petsData=pets
        })
    })

    //este test añade las mascotas del fixture correspondiente para añadir datos y comprobar que los resultados del apartado 2 son correctos
    it('Añadir mascotas', function () {
        let petsArray = []
        petsArray = petsData
        petsArray.forEach(pet => {
            cy.request('POST', API.BASE_URL + API.PET, pet).then(response => {
                expect(response).property('status').to.equal(200)
            })
        })     
    })

    //1. Crea tu usuario mediante petición HTTP y posteriormente recupera sus datos llamando al servicio correspondiente.
    it('Crear usuario y obtener sus datos', function () {
        cy.request('POST', API.BASE_URL + API.USER, userData)
            .then(response => {
                console.log(response.body)
                expect(response.status).to.equals(200) 
            })
        cy.request('GET', API.BASE_URL + API.USER + '/'+ userData.username)
            .then(response => {
                console.log(response.body)
                expect(response.body).to.deep.equals(userData) //se comprueba que los datos coinciden con los que se han enviado
            })
    })

    /*
        2. Recoge mediante petición HTTP, el JSON que retorna el endpoint /pet/findByStatus y lista mediante una función los nombres de las mascotas que se hayan vendido.
        - El formato de salida deberá estar formado por la tupla {id, name}. - Puedes utilizar la estructura de datos que prefieras.
    */
    it('2. Obtener y listar ventas', function () {
        cy.request('GET', API.BASE_URL + API.PET + API.FIND_BY_STATUS + `?status=${status}`)
            .then(response => {
                cy.writeFile(soldPetsFile, getIdNamePairs(response.body))
            })
    })

    /*
        3. Crea una clase cuyo constructor requiera de la estructura de datos anterior y realiza un método que pueda recorrerla para poder identificar cuantas mascotas se llaman igual.
        - Ejemplo de salida: {“William”: 11, “ Floyd”: 2}
    */
    it('3. Buscar duplicados', function() {
        let tuples = []
        let listValidator
        cy.request('GET', API.BASE_URL + API.PET + API.FIND_BY_STATUS + `?status=${status}`)
            .then(response => {
                tuples = getIdNamePairs(response.body)
                listValidator = new ListVerificator(tuples)
                cy.writeFile(duplicatesFile, listValidator.findDuplicates())
            })
    })
})
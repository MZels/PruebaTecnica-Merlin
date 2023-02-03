/* El ejercicio 2 nos pide:
    1. Buscar en Google la palabra “automatización”
    2. Buscar el link de la Wikipedia resultante
    3. Comprobar en qué año se hizo el primer proceso automático
    4. Realizar un screenshot de la página de la Wikipedia
*/

/// <reference types="cypress" />

describe('Prueba técnica', () => {

    it('Ejercicio 2', () => {

        const busqueda = "automatización"

        // 1. Buscar en Google la palabra “automatización”
        cy.visit('https://www.google.es')
        cy.get('#W0wltc').click()
        cy.get('input[name="q"]')
            .type(`${busqueda}{enter}`, { delay: 100 })

        // 2. Buscar el link de la Wikipedia resultante
        cy.contains('wikipedia')
            .should('have.attr', 'href')
            .and('include', 'wikipedia')
            .then((href) => {
                cy.visit(href)
                cy.origin(href,()=>{

                    /* 3. Comprobar en qué año se hizo el primer proceso automático:
                       Entendiendo que el objetivo del test es averiguar el año en el se hizo llevó a cabo el primer proceso automático,
                       es decir, que el tester desconoce dicho año, procemos a buscar la frase en la que se habla de "primer proceso" y
                       se busca la mención de un año mediante expresión regular. En caso de que haya más de uno, se da por no encontrado.
                    */
                    cy.get('p').contains('primer proceso').then(($p)=>{ 
                        const frases = $p.text().split('.')
                        console.log($p.text())
                        const expReg = new RegExp(/[1]\d{3}/,'g') 
                        var anio = 'notFound'
                        frases.forEach(frase => {
                            if (frase.includes('primer proceso') && expReg.test(frase)){
                                var anios = frase.match(expReg)
                                if (anios.length == 1){
                                    console.log("año encontrado = "+ anios[0])
                                    anio = anios[0]
                                }
                            }
                        })
                        expect(anio).to.match(expReg)
                        if(anio.match(expReg))
                            cy.log('El primer proceso automático tuvo lugar en el año '+ anio)
                        else cy.log('No se ha encontrado el año del primer proceso automático')
                    })
                    // 4. Realizar un screenshot de la página de la Wikipedia
                    cy.screenshot('Captura_wikipedia',{overwrite: true})
                })
            })
    })
})
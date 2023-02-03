export class ListVerificator{

    constructor (list){
        this.list = list
    }

    /*
     Este método recorre la lista del objecto instanciado, contando los valores duplicados.
     Devulve 
     */
    findDuplicates(){

        var pets = this.list
        var names = []

        pets.forEach(tuple => {
            names.push(Object.values(tuple)[0]) //nos quedamos solo con los nombres
        })

        var aux = names //array auxiliar contra el que se compara
        var duplicates = {}

        names.forEach(name => {
            var count = 0
            aux.forEach(auxName => {
                if(auxName == name) count++
            })
            if (count > 0) duplicates[`${name}`] = count
        })
        cy.log('Numero de mascotas con el mismo nombre: \n'+ JSON.stringify(duplicates).replaceAll(',','\n'))
        return duplicates
    }
}
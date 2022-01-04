const fs = require('fs');
const path = require('path');
// Recibo por parámetro la entidad para reutilizarlo


const modelController = function (name) {
    console.log('entre al modelo')
    console.log(name)
    console.log(path.resolve(__dirname, '../data/', `${name}.json`))
    return {
        tablePath: path.resolve(__dirname, '../data/', `${name}.json`),

        // Leo el archivo Json y lo transformo en Array de objeto literal     
        readFile: function () {
            let tableContents = fs.readFileSync(this.tablePath, 'utf-8');
            return JSON.parse(tableContents) || []; 
        },
        // Grabo el array que recibo por parámetro y lo paso a formato Json
        writeFile: function (contents) {
            let tableContents = JSON.stringify(contents, null, ' ');
            fs.writeFileSync(this.tablePath, tableContents);
        },
        // Averiguo el próximo id
        nextId: function () {
            let rows = this.readFile();
            let lastRow = rows.pop();

            return lastRow.id ? ++lastRow.id : 1;
        },
        // Leo todos los registros del archivo
        all: function () {
            console.log('Estoy buscando los productos ahora')
            console.log(this.readFile())
            return this.readFile();
        },
        // Busco por id
        find: function (id) {
            let rows = this.readFile();
            console.log(" --- por el find")
            return rows.find(i => i.id == id);
        },

        // agrego un registro que paso por parámetro
        create: function (row) {
            let rows = this.readFile();
            // Averiguo el último id y lo actualizo
            row.id = this.nextId();
            // Agrego en el array
            rows.push(row);
            // grabo el array en el archivo
            this.writeFile(rows);
            //Retorno el último id generado
            return row.id;
        },
        // Actualizo el archivo
        update: function (row) {
            let rows = this.readFile();

            let updatedRows = rows.map(oneRow => {
                if (oneRow.id == row.id) {
                    return row;
                }

                return oneRow;
            });
            // escribo el archivo
            console.log(updatedRows)
            this.writeFile(updatedRows);

            return row.id;
        },

        // Elimino el registro en el archivo según un id    
        delete: function (id) {

            console.log('Elimino :' + id)
            let rows = this.readFile();
            let updatedRows = rows.filter(row => {
                return row.id != id;
            });

            this.writeFile(updatedRows);
        },

        searchCategory: function(value){
            let rows = this.readFile();
            console.log(" --- filtro de home")
            
            const result = rows.filter(i => i.category.toLowerCase() == value.toLowerCase());
            console.log(" --- ESTOY ----------------------")
            console.log(result);
            return result;
            //TOLOWERCASE sirve para transformar cuanlquier palabra tanto mayuscula como minuscula sin importar si la palabra este con M o Minuscula
            //ej: Hamburguesa, si lo busco con h minuscula lo encuentra igual
        },

        home: function () {
            let rows = this.readFile();
            console.log(" --- filtro de home")
            
            const home = rows.filter(i => i.category == 'home')
            console.log(" --- ESTOY ----------------------")
            console.log(home)
            return home 
        },

        menu: function () {
            let rows = this.readFile();
            console.log(" --- filtro de menu")
            const menu = rows.filter(i => i.category == 'menu')
            console.log(" --- NUESTRO MENU--------------------")
            console.log(menu)
            return menu
        },

        productos: function () {
            let rows = this.readFile();
            console.log(" --- filtro los que están para venta")
            const productos = rows.filter(i => i.section == 'productos')
            console.log(" --- ESTOY EN VENTA--------------------")
            console.log(productos)
            return productos
        },
    }
}

module.exports = modelController
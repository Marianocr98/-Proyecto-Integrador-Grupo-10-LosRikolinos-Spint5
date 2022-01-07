const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const user = {
    fileName: path.resolve(__dirname, '../data/users.json'),
    getData: function(){
        return JSON.parse(fs.readFileSync(this.fileName,'utf-8'))
    },
    findAllUsers: function(){ 
        return this.getData()
    },
    findByPk: function(id)
    {
        let allUsers = this.findAllUsers()
        let userFound = allUsers.find(oneUser => oneUser.id == id);
        return userFound
    },
    findByField: function(field,text){
        let allUsers = this.findAllUsers()
        let userFound = allUsers.find(oneUser => oneUser[field] === text)
        return userFound
    },
    generateId: function(){
        let allUsers = this.findAllUsers()
        let lastUser = allUsers.pop()
        if(lastUser){
            return lastUser.id + 1
        }
        return 1
    },
    create: function(userData){
        let allUsers = this.findAllUsers()
        let newUser = {
            id : this.generateId(),
            ...userData,
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName,JSON.stringify(allUsers,null," "))
        return newUser
    },
    delete: function(id){
        let allUsers = this.findAllUsers()
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName,JSON.stringify(finalUsers,null," "))
        return true
    }
}
/*
Pruebas de las funciones en la terminal
console.log(user.getData())
console.log(user.findAllUsers())
console.log(user.findByPk(1))
console.log(user.findByField('email','marce@gmail.com'))
console.log(user.create({fullName: 'marce',email: 'marce@gmail.com'}))
console.log(user.generateId())
console.log(user.delete(5))

*/


module.exports = user


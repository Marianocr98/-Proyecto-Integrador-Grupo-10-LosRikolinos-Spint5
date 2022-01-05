/*const {readFileSync, writeFileSync} = require('fs');
const {resolve} = require ('path');
const {hashSync} = require ('bcrypt');

const model = {
    file: resolve(__dirname, '../data', 'users.json'),
    all: () => JSON.parse(readFileSync(model.file)),
    generate: (data) => Object ({
        id: model.all().length == 0 ? 1 : model.all().pop().id +1,
        fullName: data.fullName,
        email: data.email,
        password: hashSync(data.password, 10)
    }),
    add: (data) => {
        let list = model.all()
        let user = model.generate(data)
        list.push(user)
        writeFileSync(model.file, JSON.stringify(list, null, 2))
        return user
    }

}

module.exports = model

*/
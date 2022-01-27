const fs = require('fs')
const path = require('path');

function logRegisterMiddleware(req,res,next)  {
    fs.appendFileSync(path.join(__dirname, '../ingresosDeUsuarios/logRegister.txt'), 'Se creo un registro al ingresar en ' + req.body.email + '\n');
        
    next();
}

module.exports = logRegisterMiddleware;
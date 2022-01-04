const fs = require('fs')

function logRegisterMiddleware(req,res,next)  {
    fs.appendFileSync('./ingresosDeUsuarios/logRegister.txt', 'Se creo un registro al ingresar en ' + req.url)
        
    next();
}

module.exports = logRegisterMiddleware
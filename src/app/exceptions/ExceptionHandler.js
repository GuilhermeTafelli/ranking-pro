const ErrorCode = require('./ErrorCode')

module.exports = function ExceptionHandler(res, error){
    
    if(error.code === ErrorCode.USER_ALREDY_EXISTS.code){
        return res.status(400).send(error)
    }

    if(error.code === ErrorCode.USER_NOT_FOUND.code){
        return res.status(404).send(error)
    }


    if(error.code === ErrorCode.GAMIFICATION_CODE_NOT_FOUND.code){
        return res.status(404).send(error)
    }

    if(error.code === ErrorCode.INVALID_AUTHENTICATION.code){
        return res.status(401).send(error)
    }

    if(error.code === ErrorCode.FAILED_SEND_RESET_PASSWORD_TOKEN.code){
        return res.status(500).send(error)
    }

    if(error.code === ErrorCode.INVALID_TOKEN.code){
        return res.status(422).send(error)
    }
    
    if(error.code === ErrorCode.TOKEN_EXPIRED.code){
        return res.status(422).send(error)
    }

    if(error.code === ErrorCode.FAILED_RESET_PASSWORD.code){
        return res.status(500).send(error)
    }

    else res.status(500).send(error)

}
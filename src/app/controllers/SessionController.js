const SessionService = require('../services/SessionService')
const ExceptionHandler = require('../exceptions/ExceptionHandler')
class SessionController {
    async auth(req, res){
        try {
            var response = await SessionService.auth(req.body)

            res.status(200)
            return res.json(response)
        } catch(error){
            ExceptionHandler(res, error)
        }
    }
}

module.exports = new SessionController();


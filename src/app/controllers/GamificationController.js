const GamificationService = require("../services/GamificationService")
const ExceptionHandler = require("../exceptions/ExceptionHandler")

class GamificationController{

    async create(req, res){
        try {

            if(!req.roles.includes("ADMIN")) throw new Exception(ErrorCode.PERMISSION_DENIED)

            const response = await GamificationService.createGamificationCode(req.body)

            res.status(201)
            return res.json(response)        
        }
        catch(error){
            ExceptionHandler(res, error)
        }
    }

    async validityCode(req, res){
        try {
             const response = await GamificationService.validityCode(req.body.code, req.userId)
             return res.json(response)        
            }
        catch(error){
            ExceptionHandler(res, error)
        }
    }
}

module.exports = new GamificationController()
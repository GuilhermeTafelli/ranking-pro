const SocialMediaService = require("../services/SocialMediaService")
const ExceptionHandler = require("../exceptions/ExceptionHandler")

class SocialMediaController{

    async create(req, res){
        try {
            const response = await SocialMediaService.create(req.body)

            res.status(201)
            return res.json(response)        
        }
        catch(error){
            ExceptionHandler(res, error)
        }
    }

    async getById(req, res){
        try {
            const response = await SocialMediaService.getById(req.params.socialMediaId)

            res.status(200)
            return res.json(response)        
        }
        catch(error){
            ExceptionHandler(res, error)
        }
    }

    async getRanking(req, res){
        try {
            const response = await SocialMediaService.getRanking()

            res.status(200)
            return res.json(response)        
        }
        catch(error){
            ExceptionHandler(res, error)
        }
    }

}

module.exports = new SocialMediaController()
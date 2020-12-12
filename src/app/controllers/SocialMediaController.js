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

            return res.json(response)        
        }
        catch(error){
            ExceptionHandler(res, error)
        }
    }

    async getByUserId(req, res){
        try {
            const response = await SocialMediaService.getByUserId(req.userId)

            return res.json(response)        
        }
        catch(error){
            ExceptionHandler(res, error)
        }
    }

    async getGamificationCodesByUserId(req, res){
        try {
            const response = await SocialMediaService.getGamificationCodesByUserId(req.userId)

            return res.json(response)        
        }
        catch(error){
            ExceptionHandler(res, error)
        }
    }
    async getRanking(req, res){
        try {
            const response = await SocialMediaService.getRanking(req.userId)

            return res.json(response)        
        }
        catch(error){
            ExceptionHandler(res, error)
        }
    }

    async getRankingPaged(req, res){
        try {
            const response = await SocialMediaService.getRankingPaged(req.userId)

            return res.json(response)        
        }
        catch(error){
            ExceptionHandler(res, error)
        }
    }

    async getRankingScore(req, res){
        try {
            const response = await SocialMediaService.getRankingScore(req.userId)

            return res.json(response)        
        }
        catch(error){
            ExceptionHandler(res, error)
        }
    }

    async updateCodeScoreInAllUsers(req, res){
        try {

            if(!req.roles.includes("ADMIN")) throw new Exception(ErrorCode.PERMISSION_DENIED)

            const response = await SocialMediaService.updateCodeScoreInAllUsers(req.body.code, req.body.score)

            return res.json(response)
        }
        catch(error){
            ExceptionHandler(res, error)
        }
    }

}

module.exports = new SocialMediaController()
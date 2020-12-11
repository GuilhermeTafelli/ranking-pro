const { GamificationCode } = require("../models");
const Exception = require('../exceptions/Exception')
const ErrorCode = require('../exceptions/ErrorCode')
const SocialMediaService = require("./SocialMediaService");


class GamificationService {

    async createGamificationCode(newGamificationCode) {

        try {
            const gamificationCode = await GamificationCode.findOne({ where: { code: newGamificationCode.code } });

            if (gamificationCode) {
                throw new Exception(ErrorCode.GAMIFICATION_CODE_ALREDY_EXISTS)
            }


            const response = await GamificationCode.create(newGamificationCode)

            return response
        }
        catch (error) {
            if (error instanceof Exception) throw error;
            throw new Exception(ErrorCode.CREATE_GAMIFICATION_CODES_FAILED)
        }
    }
    
    calculateScore(gamificationCodes){
        var score = 0
        gamificationCodes.forEach(gamificationCode => score+=gamificationCode.score)
        return score
    }

    async validityCode(codeVerify, userId) {

        try {

            const gamificationCode = await GamificationCode.findOne({ where: { code: codeVerify.toUpperCase() } });

            if (!gamificationCode) {
                throw new Exception(ErrorCode.GAMIFICATION_CODE_NOT_FOUND)
            }

            const socialMedia = await SocialMediaService.getByUserId(userId)


            const hasCode = Boolean(socialMedia.gamificationCodes ? socialMedia.gamificationCodes.find(code => code.code == codeVerify.toUpperCase()) : false)

            if(hasCode) throw new Exception(ErrorCode.GAMIFICATION_CODE_ALREDY_REGISTERED)

            socialMedia.gamificationCodes.push({
                code: gamificationCode.code,
                score: gamificationCode.score
            })

            const newScore = this.calculateScore(socialMedia.gamificationCodes)

            await SocialMediaService.updateGamificationCodeAndScore(socialMedia.gamificationCodes, newScore, socialMedia.id)
            return {score: gamificationCode.score}
        }
        catch (error) {
            console.log(error, codeVerify)
            if (error instanceof Exception) throw error;
            throw new Exception(ErrorCode.UPDATE_SOCIAL_MEDIA_GAMIFICATION_CODES_FAILED)
        }
    }


}

module.exports = new GamificationService();
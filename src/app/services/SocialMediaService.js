const { SocialMedia } = require('../models')
const Exception = require('../exceptions/Exception')
const ErrorCode = require('../exceptions/ErrorCode')
const { User } = require('../models')
const { mapToResponse, mapToResponseRanking, mapToResponseRankingScore } = require('./mappers/SocialMediaServiceMapper');
const UserService = require('./UserService')
const db = require('../models/index');
class SocialMediaService {

    async create(newSocialMedia) {

        try {
            const transaction = await db.sequelize.transaction();

            const response = await UserService.createWithTransaction(newSocialMedia.user, transaction)

            const socialMedia = await SocialMedia.create(
                {
                    userId: response.user.id,
                    instagram: newSocialMedia.instagram,
                    facebook: newSocialMedia.facebook,
                    youtube: newSocialMedia.youtube,
                    twitter: newSocialMedia.twitter,
                    linkedin: newSocialMedia.linkedin,
                    tiktok: newSocialMedia.tiktok,
                    aboutMe: newSocialMedia.aboutMe,
                    whereYouFrom: newSocialMedia.whereYouFrom,
                    skills: newSocialMedia.skills,
                    niches: newSocialMedia.niches,
                },
                { transaction: transaction }
            )

            transaction.commit()

            return { ...response, socialMedia }


        }
        catch (error) {
            console.log(error)
            await transaction.rollback();
            if (error.code === ErrorCode.SOCIAL_MEDIA_ALREDY_EXISTS.code) throw error;
            throw new Exception(ErrorCode.CREATE_SOCIAL_MEDIA_FAILED)
        }
    }


    async updateGamificationCodeAndScore(gamificationCodes, newScore, socialMediaId) {
        try {
            await SocialMedia.update(
                {
                    gamificationCodes: gamificationCodes,
                    score: newScore
                },
                {
                    where: {
                        id: socialMediaId
                    }
                }

            )

            return
        }
        catch (error) {
            throw new Exception(ErrorCode.UPDATE_SOCIAL_MEDIA_GAMIFICATION_CODES_FAILED)
        }
    }

    async getRanking(userId) {
        try {
            const socialsMedia = await SocialMedia.findAll({ include: { model: User } })
            return mapToResponseRanking(socialsMedia, userId)
        }
        catch (error) {
            throw new Exception(ErrorCode.GET_SOCIAL_MEDIA_BY_ID_FAILED)
        }
    }

    async getRankingPaged(userId) {
        try {
            const socialsMedia = await SocialMedia.findAndCountAll({ include: { model: User }, limit: 5 })
            return mapToResponseRanking(socialsMedia.rows, userId)
        }
        catch (error) {
            throw new Exception(ErrorCode.GET_SOCIAL_MEDIA_BY_ID_FAILED)
        }
    }


    async getRankingScore(userId) {
        try {
            const socialsMedia = await SocialMedia.findAll({ include: { model: User } })
            return mapToResponseRankingScore(socialsMedia, userId)
        }
        catch (error) {
            throw new Exception(ErrorCode.GET_SOCIAL_MEDIA_BY_ID_FAILED)
        }

    }

    async getById(socialMediaId) {
        try {
            const socialMedia = await SocialMedia.findOne({ where: { id: socialMediaId }, include: { model: User } })
            return mapToResponse(socialMedia, socialMedia.User)
        }
        catch (error) {
            throw new Exception(ErrorCode.GET_SOCIAL_MEDIA_BY_ID_FAILED)
        }

    }

    async getByUserId(userId) {
        try {

            const socialMedia = await SocialMedia.findOne({ where: { userId: userId }, include: { model: User } })


            if (!socialMedia) {
                throw new Exception(ErrorCode.SOCIAL_MEDIA_NOT_FOUND)
            }

            return mapToResponse(socialMedia, socialMedia.User)
        }
        catch (error) {
            if (error instanceof Exception) throw error;
            throw new Exception(ErrorCode.GET_SOCIAL_MEDIA_BY_ID_FAILED)
        }
    }

    async getGamificationCodesByUserId(userId) {
        try {

            const socialMedia = await SocialMedia.findOne({ where: { userId: userId } })


            if (!socialMedia) {
                throw new Exception(ErrorCode.SOCIAL_MEDIA_NOT_FOUND)
            }

            return socialMedia.gamificationCodes
        }
        catch (error) {
            if (error instanceof Exception) throw error;
            throw new Exception(ErrorCode.GET_SOCIAL_MEDIA_BY_ID_FAILED)
        }
    }

    calculateScore(gamificationCodes) {
        var score = 0
        gamificationCodes.forEach(gamificationCode => score += gamificationCode.score)
        return score
    }

    async updateCodeScoreInAllUsers(code, score) {
        try {
            const socialsMedia = await SocialMedia.findAll()

            socialsMedia.map(socialMedia => {
                socialMedia.gamificationCodes.map((gamificationCode, index) => {
                    console.log(gamificationCode.code, code)
                    if (gamificationCode.code === code){
                        socialMedia.gamificationCodes[index].score = score
                        console.log("enter")
                    }
                })
                console.log(socialMedia.gamificationCodes)
                const newScore = this.calculateScore(socialMedia.gamificationCodes)
                console.log(newScore)
                socialMedia.score = newScore
                socialMedia.save()
            })
        }
        catch(error){
            console.log(error)
        }
    }

}

module.exports = new SocialMediaService()
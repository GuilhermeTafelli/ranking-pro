const { SocialMedia } = require('../models')
const Exception = require('../exceptions/Exception')
const ErrorCode = require('../exceptions/ErrorCode')
const { User } = require('../models')
const { mapToResponse, mapToResponseRanking} = require('./mappers/SocialMediaServiceMapper');

class SocialMediaService{

    async create(newSocialMedia){
        try {
            const existingSocialMedia = await SocialMedia.findOne({ where: { userId: newSocialMedia.userId } } )
        
            if (existingSocialMedia) {
                console.log("error")
                throw new Exception(ErrorCode.SOCIAL_MEDIA_ALREDY_EXISTS)
            }
            
            const socialMedia = await SocialMedia.create(
                {
                    userId: newSocialMedia.userId,
                    instagram: newSocialMedia.instagram,
                    facebook: newSocialMedia.facebook,
                    youtube: newSocialMedia.youtube,
                    twitter: newSocialMedia.twitter,
                    linkedin: newSocialMedia.linkedin,
                    tiktok: newSocialMedia.tiktok,
                    aboutMe: newSocialMedia.aboutMe,
                    whereYouFrom: newSocialMedia.whereYouFrom,
                    monthlyInvoicing: newSocialMedia.monthlyInvoicing,
                    skills: newSocialMedia.skills,
                    niches: newSocialMedia.niches,
                    currentContracts: newSocialMedia.currentContracts
                }
            )
        
            return socialMedia        
        }
        catch(error){
            console.log(error)
            if(error.code === ErrorCode.SOCIAL_MEDIA_ALREDY_EXISTS.code) throw error;
            throw new Exception(ErrorCode.CREATE_SOCIAL_MEDIA_FAILED)
        }
    }

    async getRanking(userId){
        try{
            const socialsMedia = await SocialMedia.findAll({include: {model:User}})  
            return mapToResponseRanking(socialsMedia, userId)
        }
        catch(error){
            console.log(error)
            throw new Exception(ErrorCode.GET_SOCIAL_MEDIA_BY_ID_FAILED)
        }

    }


    async getById(socialMediaId){
        try{
            const socialMedia = await SocialMedia.findOne({ where: {id: socialMediaId}, include: {model:User}})
            console.log("enter")
            return mapToResponse(socialMedia, socialMedia.User)
        }
        catch(error){
            console.log(error)
            throw new Exception(ErrorCode.GET_SOCIAL_MEDIA_BY_ID_FAILED)
        }

    }

    async getByUserId(userId){
        try{
            const socialMedia = await SocialMedia.findOne({ where: {userId: userId}, include: {model:User}})
            
            return mapToResponse(socialMedia, socialMedia.User)
        }
        catch(error){
            console.log(error)
            throw new Exception(ErrorCode.GET_SOCIAL_MEDIA_BY_ID_FAILED)
        }

    }
}

module.exports = new SocialMediaService()
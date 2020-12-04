const { SocialMedia } = require('../models')
const Exception = require('../exceptions/Exception')
const ErrorCode = require('../exceptions/ErrorCode')
const { User } = require('../models')
const mapToResponse = require('./mappers/SocialMediaServiceMapper');
const mapToResponseRanking = require('./mappers/SocialMediaServiceMapper');

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

    async getRanking(){
        try{
            const socialsMedia = await SocialMedia.findAll({include: User})            
            return mapToResponseRanking(socialsMedia)
        }
        catch(error){
            console.log(error)
            throw new Exception(ErrorCode.GET_SOCIAL_MEDIA_BY_ID_FAILED)
        }

    }


    async getById(socialMediaId){
        try{
            const socialMedia = await SocialMedia.findOne({ where: {id: socialMediaId}})
            const user = await User.findOne({ where: {id: socialMedia.userId } })
            
            return mapToResponse(socialMedia, user)
        }
        catch(error){
            console.log(error)
            throw new Exception(ErrorCode.GET_SOCIAL_MEDIA_BY_ID_FAILED)
        }

    }
}

module.exports = new SocialMediaService()
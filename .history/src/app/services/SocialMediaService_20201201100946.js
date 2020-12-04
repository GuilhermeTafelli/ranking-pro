const { SocialMedia } = require('../models')
const Exception = require('../exceptions/Exception')
const ErrorCode = require('../exceptions/ErrorCode')
const { User } = require('../models')
const mapToResponse = require('./mappers/SocialMediaServiceMapper');

class SocialMediaService{

    async create(newSocialMedia){
        try {

            const transaction = await sequelize.transaction();

            const existingUser = await User.findOne({ where: { email: newSocialMedia.email } })
        
            if (existingUser) {
                console.log("error")
                throw new Exception(ErrorCode.USER_ALREDY_EXISTS)
            }

            var profilePhotoLink

            if(newUser.profilePhoto){
                const randomBytes  = crypto.randomBytes(8).toString('hex')
                profilePhotoLink = await S3Service.uploadFilePublicRead(newUser.profilePhoto.base64, "profile-photo-"+newUser.name+"-"+randomBytes)
            }

            const user = await User.create(
                {
                    name: newSocialMedia.name,
                    email: newSocialMedia.email,
                    password: newSocialMedia.password,
                    phone: newSocialMedia.phone,
                    profilePhotoLink: profilePhotoLink
                },
                {
                    transaction: transaction
                }
            )
        
            console.log(user)

            let token = await user.generateToken()


            const socialMedia = await SocialMedia.create(
                {
                    userId: newSocialMedia.userId,
                    instagram: newSocialMedia.instagram,
                    facebook: newSocialMedia.facebook,
                    youtube: newSocialMedia.youtube,
                    twitter: newSocialMedia.twitter,
                    linkedin: newSocialMedia.linkedin,
                    aboutMe: newSocialMedia.aboutMe,
                    whereYouFrom: newSocialMedia.whereYouFrom,
                    monthlyInvoicing: newSocialMedia.monthlyInvoicing,
                    skills: newSocialMedia.skills,
                    currentContracts: newSocialMedia.currentContracts
                },
                {
                    transaction: transaction
                }
            )

            await transaction.commit()
        
            return socialMedia        
        }
        catch(error){
            console.log(error)
            transaction.rollback()
            if(error.code === ErrorCode.SOCIAL_MEDIA_ALREDY_EXISTS.code) throw error;
            throw new Exception(ErrorCode.CREATE_SOCIAL_MEDIA_FAILED)
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
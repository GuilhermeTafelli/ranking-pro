const { SocialMedia } = require("../models");
const { ProfileInstagramSimulation } = require("../models");
const Exception = require('../exceptions/Exception')
const ErrorCode = require('../exceptions/ErrorCode')
const S3Service = require('../integrations/S3Service')
const crypto = require('crypto')
const { mapListToResponse, mapCompleteToResponse } = require('./mappers/InstagramProfileSimulationServiceMapper')

class InstagramProfileSimulationService {

    async create(newSimulation, userId) {

        try {

            const socialMedia = await SocialMedia.findOne({ where: { userId: userId } })


            if (!socialMedia) {
                throw new Exception(ErrorCode.SOCIAL_MEDIA_NOT_FOUND)
            }
            
            var profilePhoto = ""
            var highlights = []
            
            if (newSimulation.profilePhoto) {
                    const randomBytes = crypto.randomBytes(8).toString('hex')
                    profilePhoto = await S3Service.uploadFilePublicRead(newSimulation.profilePhoto, "instagram-simulation-profile-photo" + "-" + randomBytes)
            }

            if (newSimulation.highlights) {
                await Promise.all(newSimulation.highlights.map(async highlight => {
                    const randomBytes = crypto.randomBytes(8).toString('hex')
                    const link = await S3Service.uploadFilePublicRead(highlight.image, "instagram-simulation-highlights" + "-" + randomBytes)
                    highlights.push({
                        image: link,
                        title: highlight.title
                    })
                }))
            }

            const profileInstagramSimulation = await ProfileInstagramSimulation.create(
                {
                    socialMediaId: socialMedia.id,
                    name: newSimulation.name,
                    profileName: newSimulation.profileName,
                    publications: newSimulation.publications,
                    profilePhoto: profilePhoto,
                    followers: newSimulation.followers,
                    following: newSimulation.following,
                    category: newSimulation.category,
                    bio: newSimulation.bio,
                    highlights: highlights
                }
            )

            return { id: profileInstagramSimulation.id}
        }
        catch (error) {
            console.log(error)
            if (error instanceof Exception) throw error;
            throw new Exception(ErrorCode.CREATE_USER_FAILED)
        }
    }


    async listInstagramProfileSimulationsByUserId(userId) {

        try {

            const socialMedia = await SocialMedia.findOne({ where: { userId: userId } })


            if (!socialMedia) {
                throw new Exception(ErrorCode.SOCIAL_MEDIA_NOT_FOUND)
            }
            
            const instagramProfileSimulations = await ProfileInstagramSimulation.findAll({ where: { socialMediaId: socialMedia.id } });
            return mapListToResponse(instagramProfileSimulations)
        }
        catch (error) {
            console.log(error)
            if (error instanceof Exception) throw error;
            throw new Exception(ErrorCode.CREATE_USER_FAILED)
        }
    }

    async getInstagramProfileSimulationsByUserId(userId, id) {

        try {

            const socialMedia = await SocialMedia.findOne({ where: { userId: userId } })


            if (!socialMedia) {
                throw new Exception(ErrorCode.SOCIAL_MEDIA_NOT_FOUND)
            }
            
            const instagramProfileSimulation = await ProfileInstagramSimulation.findOne({ where: { socialMediaId: socialMedia.id, id: id} });
            return mapCompleteToResponse(instagramProfileSimulation)
        }
        catch (error) {
            console.log(error)
            if (error instanceof Exception) throw error;
            throw new Exception(ErrorCode.CREATE_USER_FAILED)
        }
    }
}

module.exports = new InstagramProfileSimulationService();
const { User } = require("../models");
const Exception = require('../exceptions/Exception')
const ErrorCode = require('../exceptions/ErrorCode')
const S3Service = require('../integrations/S3Service')
const crypto = require('crypto')
const mapToResponse = require('./mappers/UserServiceMapper');
const moment = require('moment')
const db = require('../models/index');

class UserService{


    async userExistsByEmail(email){
        const existingUser = await User.findOne({ where: { email: email } })

        return {
            exists: Boolean(existingUser)
        }
    }

    async userExistsByCpf(cpf){
        const existingUser = await User.findOne({ where: { cpf: cpf } })

        return {
            exists: Boolean(existingUser)
        }
    }

    async create(newUser){
        const transaction = await db.sequelize.transaction();
        try {
            const existingUser = await User.findOne({ where: { email: newUser.email }})
        
            if (existingUser) {
                throw new Exception(ErrorCode.USER_ALREDY_EXISTS)
            }

            var profilePhotoLink

            if(newUser.profilePhoto){
                const randomBytes  = crypto.randomBytes(8).toString('hex')
                profilePhotoLink = await S3Service.uploadFilePublicRead(newUser.profilePhoto.base64, "profile-photo-"+newUser.fullName+"-"+randomBytes)
            }

            const birthDate =  moment(newUser.birthDate, "DD/MM/YYYY").toDate()

            const user = await User.create(
                {
                    fullName: newUser.fullName,
                    birthDate: birthDate,
                    sex: newUser.sex,
                    cpf: newUser.cpf,
                    email: newUser.email,
                    address: newUser.address,
                    addressNumber: newUser.addressNumber,
                    addressComplement: newUser.addressComplement,
                    city: newUser.city,
                    state: newUser.state,
                    country: newUser.country,
                    postalCode: newUser.postalCode,
                    whatsApp: newUser.whatsApp,
                    profilePhotoLink: profilePhotoLink,
                    password: newUser.password,
                    roles: ["USER"]
                },
                { transaction: transaction }
            )
                
            transaction.commit()

            let token = await user.generateToken()
            
            return { user: mapToResponse(user), token: token }        
        }
        catch(error){
            await transaction.rollback();
            if(error.code === ErrorCode.USER_ALREDY_EXISTS.code) throw error;
            throw new Exception(ErrorCode.CREATE_USER_FAILED)
        }
    }

    async createWithTransaction(newUser, transaction){

        try {
            const existingUser = await User.findOne({ where: { email: newUser.email } })
        
            if (existingUser) {
                throw new Exception(ErrorCode.USER_ALREDY_EXISTS)
            }

            var profilePhotoLink

            if(newUser.profilePhoto){
                const randomBytes  = crypto.randomBytes(8).toString('hex')
                profilePhotoLink = await S3Service.uploadFilePublicRead(newUser.profilePhoto.base64, "profile-photo-"+newUser.fullName+"-"+randomBytes)
            }

            const birthDate =  moment(newUser.birthDate, "DD/MM/YYYY").toDate()

            const user = await User.create(
                {
                    fullName: newUser.fullName,
                    birthDate: birthDate,
                    sex: newUser.sex,
                    cpf: newUser.cpf,
                    email: newUser.email,
                    address: newUser.address,
                    addressNumber: newUser.addressNumber,
                    addressComplement: newUser.addressComplement,
                    city: newUser.city,
                    state: newUser.state,
                    country: newUser.country,
                    postalCode: newUser.postalCode,
                    whatsApp: newUser.whatsApp,
                    profilePhotoLink: profilePhotoLink,
                    password: newUser.password,
                    roles: ["USER"]
                },
                { transaction: transaction }
            )
        

            let token = await user.generateToken()
        
            return { user: mapToResponse(user), token: token }        
        }
        catch(error){
            console.log(error)
            if(error.code === ErrorCode.USER_ALREDY_EXISTS.code) throw error;
            throw new Exception(ErrorCode.CREATE_USER_FAILED)
        }
    }

    async createAdmin(newUser){

        try {
            const existingUser = await User.findOne({ where: { email: newUser.email } })
        
            if (existingUser) {
                throw new Exception(ErrorCode.USER_ALREDY_EXISTS)
            }

            const user = await User.create(
                {
                    fullName: newUser.fullName,
                    cpf: newUser.cpf,
                    email: newUser.email,
                    password: newUser.password,
                    roles: ["ADMIN"]
                }
            )
        

            let token = await user.generateToken()
        
            return { user: mapToResponse(user), token: token }        
        }
        catch(error){
            if(error.code === ErrorCode.USER_ALREDY_EXISTS.code) throw error;
            throw new Exception(ErrorCode.CREATE_USER_FAILED)
        }
    }

    async update(userId, updateUser){
        try {
            const user = await User.findOne({ where: { id: userId } })
        
            if (!user) {
                throw new Exception(ErrorCode.USER_NOT_FOUND)
            }

            if(updateUser.profilePhoto.base64){
                const randomBytes  = crypto.randomBytes(8).toString('hex')
                var profilePhotoLink = await S3Service.uploadFilePublicRead(updateUser.profilePhoto.base64, "profile-photo-"+user.name+"-"+randomBytes)
                user.profilePhotoLink = profilePhotoLink
            }
            
            if(updateUser.address) user.address = updateUser.address
            if(updateUser.addressNumber) user.addressNumber = updateUser.addressNumber
            if(updateUser.addressComplement) user.addressComplement = updateUser.addressComplement
            if(updateUser.city) user.city = updateUser.city
            if(updateUser.state) user.state = updateUser.state
            if(updateUser.country) user.country = updateUser.country
            if(updateUser.postalCode) user.postalCode = updateUser.postalCode
            if(updateUser.phone) user.phone = updateUser.phone
            if(updateUser.whatsApp) user.whatsApp = updateUser.whatsApp
            if(updateUser.birthDate) user.birthDate = updateUser.birthDate
            if(updateUser.sex) user.sex = updateUser.sex

            await user.save()
        
            return mapToResponse(user)
        }
        catch(error){
            if(error.code === ErrorCode.USER_NOT_FOUND.code) throw error;
            throw new Exception(ErrorCode.UPDATE_USER_FAILED)
        }
    }
    
}

module.exports = new UserService();
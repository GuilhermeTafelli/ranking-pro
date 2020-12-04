
module.exports = {
    mapToResponse: function (socialMedia, user){
        return {
            id: socialMedia.id,
            fullName: user.fullName,
            profilePhotoLink: user.profilePhotoLink,
            phone: user.phone,
            whatsApp: user.phone,
            sex: user.sex,
            age: user.birthDate,
            city: user.city,
            state: user.state,  
            instagram: socialMedia.instagram,
            facebook: socialMedia.facebook,
            youtube: socialMedia.youtube,
            twitter: socialMedia.twitter,
            linkedin: socialMedia.linkedin,
            tiktok: socialMedia.tiktok,
            aboutMe: socialMedia.aboutMe,
            whereYouFrom: socialMedia.whereYouFrom,
            monthlyInvoicing: socialMedia.monthlyInvoicing,
            skills: socialMedia.skills,
            currentContracts: socialMedia.currentContracts
        }
    },
    mapToResponseRanking: function (socialsMedia){
        console.log(socialsMedia[0].User)
        const response = socialsMedia.map(socialMedia => ({
            id: socialMedia.id,
            fullName: socialMedia.User.fullName,
            profilePhotoLink: socialMedia.User.profilePhotoLink,
            city: socialMedia.User.city,
            state: socialMedia.User.state,  
            monthlyInvoicing: socialMedia.monthlyInvoicing,
            currentContracts: socialMedia.currentContracts
        }))
    
        return {
            socialsMedia: response
        }
    }   
}
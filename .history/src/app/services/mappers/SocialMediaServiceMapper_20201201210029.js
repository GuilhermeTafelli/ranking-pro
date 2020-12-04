
module.exports = function mapToResponse(socialMedia, user){
    return {
        id: socialMedia.id,
        name: user.name,
        surname: user.surname,
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
}


module.exports = function mapToResponseRanking(socialsMedia){
    const response = socialsMedia.map(socialMedia => (console.log(socialsMedia.user), {
        id: socialMedia.id,
        name: socialMedia.user.fullName,
        profilePhotoLink: socialMedia.user.profilePhotoLink,
        city: socialMedia.user.city,
        state: socialMedia.user.state,  
        monthlyInvoicing: socialMedia.monthlyInvoicing,
        currentContracts: socialMedia.currentContracts
    }))

    return response
}
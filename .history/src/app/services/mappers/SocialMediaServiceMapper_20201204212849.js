const moment = require('moment')

function sortRanking(a, b){
    console.log(a.monthlyInvoicing, b.monthlyInvoicing)
    if(a.monthlyInvoicing === null && b.monthlyInvoicing === null){
        return a.User.fullName - b.User.fullName
    }
    if(a.monthlyInvoicing === null) return -1
    if(b.monthlyInvoicing === null) return 1
    if(b.monthlyInvoicing === a.monthlyInvoicing){
        if(a.User.fullName > b.User.fullName) return 1
        else return -1
    }
    else return a.monthlyInvoicing - b.monthlyInvoicing
}

module.exports = {
    mapToResponse: function (socialMedia, user){

        console.log(user)
        const date =  moment(user.birthDate, "DD/MM/YYYY")
        console.log(date)
        return {
            id: socialMedia.id,
            fullName: user.fullName,
            profilePhotoLink: user.profilePhotoLink,
            phone: user.phone,
            email: user.email,
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
    mapToResponseRanking: function (socialsMedia, userId){

        console.log(userId)

        var mySocialMedia
        const response = socialsMedia.sort(sortRanking).reverse().map((socialMedia, index) => {
         
            const socialMediaResponse = {
                id: socialMedia.id,
                position: index+1,
                fullName: socialMedia.User.fullName,
                profilePhotoLink: socialMedia.User.profilePhotoLink,
                city: socialMedia.User.city,
                state: socialMedia.User.state,  
                monthlyInvoicing: socialMedia.monthlyInvoicing,
                currentContracts: socialMedia.currentContracts
            }

            if(socialMedia.User.id === userId) mySocialMedia = socialMediaResponse 

            return socialMediaResponse
        })

        console.log(response)
        
        return {
            socialsMedia: response,
            mySocialMedia: mySocialMedia

        }
    }   
}

module.exports = function mapToResponse (user){
    return {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        profilePhotoLink: user.profilePhotoLink,
        phone: user.phone,
        whatsApp: user.phone,
        sex: user.sex
    }
}
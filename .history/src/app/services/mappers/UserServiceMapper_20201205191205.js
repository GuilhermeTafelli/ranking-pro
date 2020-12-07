
module.exports = function mapToResponse (user){
    return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        profilePhotoLink: user.profilePhotoLink,
        whatsApp: user.phone,
        sex: user.sex,
        roles: user.roles
    }
}

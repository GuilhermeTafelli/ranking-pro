
module.exports = function mapListToResponse (orders){
    return orders.map(ordem => {
        return {
            id: ordem.id,
            type: ordem.type,
            status: ordem.status,
            profilePhotoLink: user.profilePhotoLink,
            whatsApp: user.phone,
            sex: user.sex
        }
}

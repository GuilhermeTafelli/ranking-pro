
module.exports = {
    mapCompleteListToResponse: function (orders) {
        return orders.map(order => {
            return {
                id: order.id,
                type: order.type,
                status: order.status,
            }
        })
    },
    mapListToResponse: function (instagramProfileSimulations) {
        return instagramProfileSimulations.map(instagramProfileSimulation => {
            return {
                id: instagramProfileSimulation.id,
                createdAt: instagramProfileSimulation.createdAt,
                name: instagramProfileSimulation.name,
            }
        })
    },
    mapCompleteToResponse: function (instagramProfileSimulation) {
        return {
            id: instagramProfileSimulation.id,
            name: instagramProfileSimulation.name,
            profileName: instagramProfileSimulation.profileName,
            publications: instagramProfileSimulation.publications,
            profilePhoto: instagramProfileSimulation.profilePhoto,
            followers: instagramProfileSimulation.followers,
            following: instagramProfileSimulation.following,
            category: instagramProfileSimulation.category,
            bio: instagramProfileSimulation.bio,
            highlights: instagramProfileSimulation.highlights
        }
    }

}
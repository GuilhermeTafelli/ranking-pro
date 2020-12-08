
module.exports = {
    mapListToResponse: function (orders) {
        return orders.map(order => {
            return {
                id: order.id,
                type: order.type,
                status: order.status,
            }
        })
    },
    mapCompleteListToResponse: function (orders) {
        return orders.map(order => {
            return {
                id: order.id,
                createdAt: order.createdAt,
                type: order.type,
                fullName: order.User.fullName,
                cpf: order.User.cpf,
                status: order.status,
            }
        })
    },
    mapCompleteToResponse: function (order) {
        return {
            id: order.id,
            createdAt: order.createdAt,
            type: order.type,
            fullName: order.User.fullName,
            cpf: order.User.cpf,
            status: order.status,
            filesLink: order.filesLink,
            messageStatus: order.messageStatus,
            description: order.description,
            customFields: order.customFields 
        }
    }

}
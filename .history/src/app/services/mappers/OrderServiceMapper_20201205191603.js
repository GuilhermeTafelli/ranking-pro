
module.exports = {
    mapListToResponse: function (orders){
        return orders.map(ordem => {
            return {
                id: ordem.id,
                type: ordem.type,
                status: ordem.status,
            }
        })
    },
    mapCompleteListToResponse: function (orders){
        return orders.map(ordem => {
            return {
                id: ordem.id,
                createdAt: order.createdAt,
                type: ordem.type,
                name: ordem.User.fullName,
                cpf: ordem.User.cpf,
                status: ordem.status,
            }
        })    
    } 
}
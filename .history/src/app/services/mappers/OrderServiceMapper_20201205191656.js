
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
                createdAt: ordem.createdAt,
                type: ordem.type,
                fullName: ordem.User.fullName,
                cpf: ordem.User.cpf,
                status: ordem.status,
            }
        })    
    } 
}
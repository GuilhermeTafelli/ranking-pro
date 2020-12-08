
const { GoogleSpreadsheet } = require('google-spreadsheet');
const credenciais = require('../../../google-sheets-credentials.json');



class UserController {


    async getUsersByCategory(req, res) {
        const doc = new GoogleSpreadsheet("14BWrLDoHeOLXcBLAGe_b6v307YJ964FZ4f-ZfEy85cA");

        await doc.useServiceAccountAuth({
            client_email: credenciais.client_email,
            private_key: credenciais.private_key.replace(/\\n/g, '\n')
        })
        await doc.loadInfo();


        let sheet;
        sheet = await doc.sheetsByIndex[0];
        const rows = await sheet.getRows()
        const response = await rows.filter((row) => row["Quais áreas você atua?"].includes(req.params.category)).map(row => ({
            name: row["Nome Completo"],
            city: row["Cidade"],
            id: row["ID"]
        }))
        console.log(response)
        return res.json(response)
    }

    async getUsersById(req, res) {
        const doc = new GoogleSpreadsheet("14BWrLDoHeOLXcBLAGe_b6v307YJ964FZ4f-ZfEy85cA");

        await doc.useServiceAccountAuth({
            client_email: credenciais.client_email,
            private_key: credenciais.private_key.replace(/\\n/g, '\n')
        })
        await doc.loadInfo();


        let sheet;
        sheet = await doc.sheetsByIndex[0];
        const rows = await sheet.getRows()
        const user = await rows.find((row) => row["ID"] == req.params.id)
        const response = {
            name: user["Nome Completo"],
            city: user["Cidade"],
            email: user["Email"],
            phone: user["Telefone"],
            whatsApp: user["WhatsApp"],
            portfolio: user["Link do portfolio"],
            instagram: user["Instagram"],
            facebook: user["Facebook"],
            atuation: user["Quais áreas você atua?"]
        }
        console.log(response)
        return res.json(response)
    }

}

module.exports = new UserController()
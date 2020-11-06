const express = require('express')
const { GoogleSpreadsheet } = require('google-spreadsheet');
const credenciais = require('./google-sheets-credentials.json');
const requireDir = require('require-dir')
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();
const nodemailer = require('nodemailer');
const fs = require('fs');
const crypto = require('crypto')
app.use(bodyParser.json())
app.use(cors())
require("dotenv-safe").config();
var jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');

mongoose.connect('mongodb+srv://admin:copa2020@cluster-1.i6ej5.gcp.mongodb.net/user?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

requireDir("./src/models");
const User = mongoose.model('User')

var sender = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'guilhermetafellieducation@gmail.com',
        pass: 'tafelli0104'
    }
});
var resetPasswordHTMLEmailTemplate

fs.readFile('./src/static/reset-password-email-template.html', function (err, data) {
    resetPasswordHTMLEmailTemplate = String(data)
});

function mapUser(user) {
    return {
        name: user.Name,
        age: user.Age,
        city: user.City,
        state: user.State,
        wyf: user.Where,
        level: parseInt(user.Level)
    };
}

app.get("/users", async (req, res) => {

    getDoc().then(doc => {

        sheet = doc.sheetsByIndex[0];
        sheet.getRows().then(rows => {
            return res.json(rows.map(mapUser))
        })
    });
});

app.post("/forgot-password", async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(404).send({ error: 'User not found' })
        }
        const token = crypto.randomBytes(20).toString('hex')
        const expiresIn = new Date()
        expiresIn.setMinutes(expiresIn.getMinutes() + 30)

        await user.updateOne(
            {
                passwordResetToken: token,
                passwordResetExpiresIn: expiresIn
            }
        )

        var resetPasswordHTMLEmailTemplateWithLink = resetPasswordHTMLEmailTemplate.replace(/{reset-password-link}/g, "http://localhost:3000/reset-passorod/token/" + token)
        const mailOptions = {
            from: 'guilhermetafelli@email.com',
            to: req.body.email,
            subject: 'Teste',
            html: resetPasswordHTMLEmailTemplateWithLink
        };

        console.log(token, expiresIn)

        await sender.sendMail(mailOptions)

        return res.end()
    }
    catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'Error on forgot password, try again' })
    }

});


app.post("/reset-password", async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email }).select('+passwordResetExpiresIn passwordResetToken')

        if (!user) {
            return res.status(404).send({ error: 'User not found' })
        }
        console.log(user)

        console.log(user.passwordResetExpiresIn, Date.now())

        if(user.passwordResetExpiresIn == null || user.passwordResetExpiresIn < Date.now())
            return res.status(400).send({ error: 'Token expired' })

        console.log(user.passwordResetToken, req.body.token)

        if(user.passwordResetToken == null || user.passwordResetToken !== req.body.token)
            return res.status(400).send({ error: 'Invalid Token' })

        else {
            await user.updateOne(
                {
                    password: req.body.newPassword,
                    passwordResetToken: null,
                    passwordResetExpiresIn: null
                }
            )
    
        }

        return res.end()
    }
    catch (error) {
        console.log(error)
        return res.status(400).send({ error: 'Error on reset password, try again' })
    }
})

app.post("/users", async (req, res) => {
    console.log(req.body.email)

    const alreadyExists = await User.exists({ email: req.body.email })

    console.log(alreadyExists)
    if (alreadyExists) {
        res.status(422)
        return res.end()
    }

    const user = await User.create(
        {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone
        }

    )

    let token = await user.generateToken()

    res.status(201)
    return res.json({ userId: user.id, token: token })
})


app.post("/auth", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        console.log(user)

        if (!(await user.compareHash(password))) {
            return res.status(400).json({ error: "Invalid password" });
        }

        console.log(user.id)
        return res.json({
            user,
            token: user.generateToken()
        });

    } catch (err) {

        console.log(err)
        return res.status(400).json({ error: "User authentication failed" });
    }
});

app.get("/users/test", async (req, res) => {

    let response = [
        {
            name: "Guilherme",
            age: "19",
            city: "Barueri",
            state: "SP",
            level: 3
        },
        {
            name: "Guilherme",
            age: "19",
            city: "Barueri",
            state: "SP",
            level: 3
        },
        {
            name: "Guilherme",
            age: "19",
            city: "Barueri",
            state: "SP",
            level: 3
        },
        {
            name: "Guilherme",
            age: "19",
            city: "Barueri",
            state: "SP",
            level: 3
        }
    ];

    return res.json(response)
});

const getDoc = async () => {
    const doc = new GoogleSpreadsheet("1i8iJmvv9jTRxRJAvWRedsYNwtECQjRX0nzdk5HfGGIM");

    await doc.useServiceAccountAuth({
        client_email: credenciais.client_email,
        private_key: credenciais.private_key.replace(/\\n/g, '\n')
    })
    await doc.loadInfo();
    return doc;
}


app.listen(8081);
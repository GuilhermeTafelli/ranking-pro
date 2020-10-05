const express = require('express')
const mongoose = require('mongoose');
const requireDir = require('require-dir')

const app = express();

mongoose.connect('mongodb://localhost:27017/mult-redirect-url',
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

requireDir("./src/models");

const Counter = mongoose.model('Counter')

app.get("/", async (req, res) => {
    

    const countOld = await Counter.findOne();

    await Counter.findByIdAndUpdate(countOld.id, {count: countOld.count+1});

    const urlList = [
        "https://www.google.com.br/",
        "https://api.whatsapp.com/send?phone=5534996699548",
        "https://api.whatsapp.com/send?phone=5534991352812"
    ]

    res.redirect(urlList[countOld.count%3])
});

app.listen(3001);
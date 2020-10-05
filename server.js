const express = require('express')
const mongoose = require('mongoose');
const requireDir = require('require-dir')

const app = express();

mongoose.connect('mongodb+srv://admin:copa2020@cluster-1.i6ej5.gcp.mongodb.net/mult-redirect-url?retryWrites=true&w=majority',
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
        "https://api.whatsapp.com/send?phone=5517991866774",
        "https://api.whatsapp.com/send?phone=5517992176410",
        "https://api.whatsapp.com/send?phone=5517988109899",
        "https://api.whatsapp.com/send?phone=5517991165619"
    ]

    res.redirect(urlList[countOld.count%4])
});

app.listen(process.env.PORT || 8080);
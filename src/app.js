require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})
const express = require("express")
const morgan = require("morgan");
const cors = require('cors')

class AppController {

    constructor(){
        this.express = express();
        this.express.use(morgan("dev"));
        this.express.use(cors())

        this.middlewares()
        this.routes() 
    }

    middlewares() {
        this.express.use(express.json({limit: '50mb'}));
    }

    routes() {
        this.express.use(require("./routes"))
    }

}

module.exports = new AppController().express
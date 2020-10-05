const mongoose = require('mongoose')

const CounterSchema = new mongoose.Schema(
    {
        count: {
            type: Number,
            require: true
        },
    }
);

mongoose.model('Counter', CounterSchema);
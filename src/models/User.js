const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        surname: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        phone: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true,
            select: true
        },
        passwordResetToken: {
            type: String,
            select: false
        },
        passwordResetExpiresIn: {
            type: Date,
            select: false
        },
    }
);

UserSchema.pre("save", async function hashPassword(next) {
    console.log("in")
    if (!this.isModified("password")) next();
    
    this.password = await bcrypt.hash(this.password, 8);
  });


UserSchema.pre('updateOne', async function(next) {

    const password = this.getUpdate().password;
    if (!password) {
        return next();
    }
    try {
        const hash = await bcrypt.hash(password, 8);
        this.getUpdate().password = hash;
        next();
    } catch (error) {
        return next(error);
    }

});

UserSchema.methods = {
    compareHash(hash) {
        console.log(this.select('password'))
        return bcrypt.compare(hash, this.password);
    },

    generateToken() {
        return jwt.sign({ id: this.id }, "auth-token", {
            expiresIn: 86400
        });
    },
};

mongoose.model('User', UserSchema);
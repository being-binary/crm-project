import { genSaltSync } from "bcryptjs";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLenght: [3, 'minimun length should be greater then 3 char']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

}, { timestamps: true })

userSchema.add({
    resetpasswordtoken: { type: String }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    try {
        const salt = genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
        next();
    } catch (err) {
        next(err)
    }
})

const users = mongoose.model('users', userSchema)

export default users
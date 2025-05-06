import { genSaltSync } from "bcryptjs"
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
const salt = genSaltSync(10)
import usercollection from '../model/userCollection.js'
import { validationResult } from "express-validator"
import mongoose from "mongoose"


const registerUser = async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    const { name, email, password } = req.body
    try {
        const isexist = await usercollection.findOne({ email })
        if (isexist) {
            return res.status(401).json({ msg: 'user already exists', success: true })
        }
        const ack = await usercollection.insertOne({
            name,
            email,
            password,
        })
        res.status(201).json({ msg: 'user created successfully', success: true })
    } catch (err) {
        res.status(401).json({ msg: 'error occured', success: false, error: err.message })
    }
}

const loginUser = async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }

    const { email, password } = req.body
    //blacklisting of token
    try {
        const isExist = await usercollection.findOne({ email })
        if (isExist) {
            const checkPassword =  bcrypt.compareSync(password, isExist.password)
            if (bcrypt.compareSync(password, isExist.password)) {
                const token = jwt.sign({ _id: isExist._id }, process.env.JWT_KEY, { expiresIn: '24h' })
                return res.status(200).json({ msg: 'logging successfull', success: true, token: token })
            }
            else {
                return res.status(401).json({ msg: 'wrong password', success: false })
            }
        }
        else {
            res.status(401).json({ msg: 'user does not exist', success: false })
        }
    } catch (err) {
        res.status(401).json({ msg: 'error occured', success: false, error: err.message })
    }
}


export {
    loginUser, 
    registerUser
}
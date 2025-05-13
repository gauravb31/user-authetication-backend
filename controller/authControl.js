const e = require('express');
const {userModel} = require('../models/user');
// const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


const signup= async (req, res) => {
    
    try {
        // Check if user already exists
        const { name, email, password } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.send("User already exists")
        };
    
        const mymodel = await userModel.create({
            name,
            email,
            password
        });
        res.send("User created successfully");
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            return res.send("User not exist ,please signup")
        }
        const ipass =password===existingUser.password;
        if (!ipass) {
            return res.send("Invalid password")
        }

        const jwtToken = jwt.sign({ email:existingUser.email , _id:existingUser._id , name:existingUser.name },
             process.env.JWT_SECRET_key || "defaultsecretkey",
             {expiresIn: "24h"}
        );
        return res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
    
                name: existingUser.name,
                email: existingUser.email,
        });


    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    signup,
    login
}
const e = require('express');
const {userModel} = require('../models/user');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const signup= async (req, res) => {
    
    try {
        const { name, email, password ,role} = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.send("User already exists")
        };
    
        // const mymodel = await userModel.create({
        //     name,
        //     email,
        //     password,
        //     role
        // });
        const mymodel = await userModel.create({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            role
        });
        
        res.send("User created successfully");
    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
};

const login = async (req, res) => {
    try {
        const { email, password ,role } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            return res.send("User not exist ,please signup")
        }
        // const ipass =password===existingUser.password;
        const ipass = await bcrypt.compare(password, existingUser.password);
        if (!ipass) {
            return res.send("Invalid password")
        }

        const jwtToken = jwt.sign({ email:existingUser.email , _id:existingUser._id , name:existingUser.name, role:existingUser.role},
             process.env.JWT_SECRET_key || "defaultsecretkey",
             {expiresIn: "24h"}
        );
        return res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
    
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role,
        });


    }
    catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    signup,
    login,
}
require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

const UserModel = require("../model/user.model");

const secrectToken = process.env.SECRECTTOKEN;
const refreshToken = process.env.REFRESHTOKEN;

const app = express.Router();

app.get("/", async (req,res)=> {
    const users = await UserModel.find();
    return res.send(users)
})

app.post("/signup", async(req,res)=> {
    let {name, email, password, role} = req.body;

    const hash = await argon2.hash(password);

    let user = await UserModel.findOne({email});
    try{

        if(user){
            return res.status(409).send("This email is already in use try with other email.")
        }
        let newUser = new UserModel({name, email, password: hash, role});
        await newUser.save();
        return res.status(201).send(newUser);

    }catch(e){
        return res.status(500).send(e.message);
    }

})

app.post("/login", async(req,res)=> {
    const {email, password} = req.body; 
    const user = await UserModel.findOne({email});

    if(await argon2.verify(user.password, password)){
        const token = jwt.sign(
            {id: user._id, name: user.name, email: user.email, role: user.role},
            secrectToken,
            {expiresIn: "7 days"}
        );

        const refreshT = jwt.sign(
            {id: user._id, name: user.name, email: user.email, role: user.role},
            refreshToken,
            {expiresIn: "28 days"}
        );

        return res.status(200).send({
            message: "Login Success",
            token,
            refreshToken: refreshT,
            user: user.name,
            id: user._id,
            role: user.role
        });

    }else{
        return res.status(401).send("invalid credentials");
    }
})

app.post("/refresh", async(req,res)=> {
    const refreshT = req.headers["authorization"];

    if(!refreshT)
        return res.status(401).send("login again");
    
    try{
        const verification = jwt.verify(refreshT, refreshToken);
        if(verification){

            const newToken = jwt.sign(
                {id: verification.id, name: verification.name, email: verification.email, role: verification.role},
                secrectToken,
                {expiresIn: "7 days"}
            )

            return res.send({token: newToken});
        }
    }catch(e){
        return res.status(401).send("unauthorized");
    }
})

module.exports = app;
const bcrypt=require('bcrypt')
const User=require("../../models/user_models")

const home=async(req,res)=>{
    try {
         res.status(200).send("Welcome to polar bear")
    } catch (error) {
        console.log(error)
    }
}

const register=async(req,res)=>{
    try {
        // console.log(req.body)
        const {username,email,phone,password}=req.body;

        const userExits=await User.findOne({email})

        if(userExits){
            return res.status(400).json({messgae:"email already exits"})
        }

        const usercreated=await User.create({username,email,phone,password})
        res.status(201).json({
            message:"registration succesful",
            token:await usercreated.generateToken(),
            userId:usercreated._id.toString(),
        })
        
    } catch (error) {
        // console.log(error)
        res.status(500).json({message:"page not found",extraDetails:"Page not found"})
    }
}

const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        // console.log(req.body)

        const userExits=await User.findOne({email})
        // console.log(`existing user ${userExits}`)

        if(!userExits){
            return res.status(400).json({message:"user has not registered",extraDetails:"please redirect to register page"})
        }

        const user=await bcrypt.compare(password,userExits.password)
        // console.log("checking password",user,password,userExits.password)
        if(user){
            res.status(200).json({
                messgae:"login successful",
                token:await userExits.generateToken(),
                userId:userExits._id.toString()
            })
        }
        else{
            res.status(400).json({messgae:"invalid password",extraDetails:"password invalid"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({messgae:"internal server error",extraDetails:"internal server error"})
    }
}


const user=async(req,res)=>{
    try{
    const userData=req.user
    // console.log("userData",userData)
    return res.status(200).json({userData})
    }
    catch(error){
        console.log(error)
    }
}

module.exports={home,register,login,user}
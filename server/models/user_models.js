const mongoose=require('mongoose')
const bcrypt=require("bcrypt")
const jwt =require('jsonwebtoken')
// jwt is used to given tokens
// bcrypt is used to encrypt the password
const userSchema=new mongoose.Schema({

    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
});

userSchema.pre("save",async function(){
    console.log("pre method",this)

    const user=this
    if(!user.isModified("password")){
        next()
    }
    try {
        const saltRound=await bcrypt.genSalt(10)
        const hash_password=await bcrypt.hash(user.password,saltRound)
        user.password=hash_password;
    } catch (error) {
        next(error)
    }
})

userSchema.methods.generateToken=async function(){
    try {
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn:"30d"
        })
    } catch (error) {
        console.error(error)
    }
}

const User=new mongoose.model("User",userSchema)
module.exports=User
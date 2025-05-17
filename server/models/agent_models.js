const mongoose=require('mongoose')

const agentSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    countrycode:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
   
});


const Agent=new mongoose.model("Agent",agentSchema)
module.exports=Agent
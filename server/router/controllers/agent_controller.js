const User=require("../../models/agent_models")
// used to create new agent and post data 
const Agent_register=async(req,res)=>{
    // console.log(req.body);
    try {
        // console.log(req.body,"this is req body of agent");
        const {name,email,countrycode,phone,password}=req.body;

        const userExits=await User.findOne({email})

        if(userExits){
            return res.status(400).json({messgae:"email already exits"})
        }

        const usercreated=await User.create({name,email,countrycode,phone,password})
        res.status(201).json({
            message:"registration succesful",
            userId:usercreated._id.toString(),
        })
        
    } catch (error) {
        console.log(error,"this is err")
        res.status(500).json({message:"page not found",extraDetails:"Page not found"})
    }
}
// used to retieve agents
const getAgents=async(req,res)=>{
    try {
        const response=await User.find()
        if(!response){
            res.status(404).json({msg:"No service find"})
        }
        res.status(200).json({msg:response})
    } catch (error) {
        console.log(error)
    }
}
module.exports={Agent_register,getAgents}
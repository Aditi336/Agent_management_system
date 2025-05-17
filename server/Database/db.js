const mongoose=require("mongoose")
// const URI=process.env.MONGODB_URI
const URI="mongodb+srv://aditijuly2004:EtQqYOXzWQG4bCY6@cluster0.pbgmshq.mongodb.net/Agents"
const connectDb=async()=>{
    try {
        await mongoose.connect(URI)
        console.log("connection successful")
        
    } catch (error) {
        console.log(error)
        process.exit(0)
    }
}

module.exports=connectDb
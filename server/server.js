require('dotenv').config();

const cors=require('cors')
const errorMiddleware=require("./middleware/error_middleware")

const express=require('express')
const app=express()
const auth_router=require('./router/auth_router')
const agent_router=require('./router/agent_router')
const task_router=require("./router/task_router")
const PORT=5000
const connectDb=require('./Database/db')
const corsOption={
    origin:"http://localhost:5173",
    methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true
};
app.use(cors(corsOption));
app.use(express.json());
app.use("/api/auth",auth_router);
app.use("/api/agent_auth",agent_router);
app.use("/api/AgentTask",task_router);
app.use(errorMiddleware)


connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`sever is listening to ${PORT}`)
    })

})

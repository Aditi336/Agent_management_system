const express=require('express')
const router=express.Router()
const task_controller=require("./controllers/task_controller")

router
    .route("/task_to_agent")
    .post(task_controller.addTaskToAgent)

router
    .route("/view_agents_task")
    .get(task_controller.getTasks)
module.exports=router
const express=require('express')
const router=express.Router()
const agent_controllers=require("./controllers/agent_controller")
const Schema=require('../validators/auth_validators')
const validate=require("../middleware/validate_middleware")
// const 

router
    .route("/agents")
    .post(validate.validate(Schema.agentSchema),agent_controllers.Agent_register)

router
    .route("/getagents")
    .get(agent_controllers.getAgents)
module.exports=router
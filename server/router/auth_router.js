const express=require('express')
const router=express.Router()
const auth_contollers=require('./controllers/auth_controller')
const validate  = require('../middleware/validate_middleware.js')
const Schema=require("../validators/auth_validators.js")
const authMiddleware = require('../middleware/auth_middleware')

router
    .route("/")
    .get(auth_contollers.home)


router
    .route("/register")
    .post(validate.validate(Schema.signSchema),auth_contollers.register)
    

router
    .route("/login")
    .post (validate.validate(Schema.loginSchema),auth_contollers.login)
    
router
    .route("/user")
    .get(authMiddleware,auth_contollers.user)
module.exports=router
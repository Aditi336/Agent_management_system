const {z}=require("zod")
// zod is used to check if the input data satisfy all given conditions if not error displayed
const signSchema=z.object({
    username:z
        .string({required_error:"Name is required"})
        .trim()
        .min(3,{message:"Name should be atleast 3 letters"})
        .max(34,{message:"Name cannot be more than 34 letters"}),
    email:z
        .string({required_error:"email is required"})
        .trim()
        .min(12,{message:"minimum length of email is 12"})
        .max(45,{message:"minimum length of email is 45"}),
    phone:z
        .string({required_error:"Phone number is required"})
        .trim()
        .min(10,{message:"number must be 10"})
        .max(10,{message:"number must be 10"}),
    password:z
        .string({required_error:"password is required"})
        .trim()
        .min(7,{message:"password must be 7"})
        .max(7,{message:"password must be 7"})
})

const loginSchema=z.object({
    email:  z
        .string({required_error:"incorrect email"})
        .trim()
        .min(10,{message:"email 7"})
        .max(244,{message:"enter email less than 244"}),
    password:  z
        .string({required_error:"incorrect password"})
        .trim()
        .min(5,{message:"password 7"})
        .max(244,{message:"enter password less than 244"}),
    
})
const agentSchema=z.object({
        name:z
        .string({required_error:"Name is required"})
        .trim()
        .min(3,{message:"Name should be atleast 3 letters"})
        .max(34,{message:"Name cannot be more than 34 letters"}),
    email:z
        .string({required_error:"email is required"})
        .trim()
        .min(12,{message:"minimum length of email is 12"})
        .max(45,{message:"minimum length of email is 45"}),
    countrycode:z.
        string({required_error:"country code is required"})
        .trim(),
    phone:z
        .string({required_error:"Phone number is required"})
        .trim()
        .min(10,{message:"number must be 10"})
        .max(10,{message:"number must be 10"}),
    password:z
        .string({required_error:"password is required"})
        .trim()
        .min(7,{message:"password must be 7"})
        .max(7,{message:"password must be 7"})

})

module.exports={signSchema,loginSchema,agentSchema}
const Task=require("../../models/distribute_model")
const Agent=require("../../models/agent_models")
const addTaskToAgent = async (req, res) => {
  try 
  {
    // console.log(res.body,"reading task");
    const tasks=req.body;
    if(!Array.isArray(tasks))
    {
      return res.status(400).json({ message: "Expected an array of tasks" });
    }
        for(const taskItem of tasks)
      {

        
        const {name, email, taskname, phone, notes } = taskItem;

        const agent = await Agent.findOne({ email });
        const agent_task=await Task.findOne({email});

        if (!agent) {
          return res.status(404).json({ message: "Agent not found" });
        }else{
          // console.log(agent,"This agent got")
        }
        const newTask = {
          taskname,
          phone,
          notes,
        };
        // console.log(newTask,"this is task i need ");
        if(!agent_task)
        {
          const taskcreated=await Task.create({name,email, orders: [newTask],})
        }
        else{
        
        agent_task.orders.push(newTask);
        await agent_task.save();
        }
      }
    res.status(200).json({ message: "task added"},{ extraDetails:"Task added successfully"});
    
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ message: "Internal server error" },{ extraDetails:"Internal errors"});
  }
};


const getTasks=async(req,res)=>{
    try {
        const {email}=req.params;
        const response=await Task.find()
        if(!response){
            res.status(404).json({msg:"No service find"})
        }
        res.status(200).json({msg:response})
    } catch (error) {
        console.log(error)
    }
}
module.exports={addTaskToAgent,getTasks}
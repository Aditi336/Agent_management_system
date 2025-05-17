const mongoose = require("mongoose");
// taskschema to store all task
// agentschema to store list of task schema along with user details
const taskSchema = new mongoose.Schema({
  taskname: String,
  phone: String,
  notes: String,
}, { timestamps: true });

const AgentTaskSchema = new mongoose.Schema({
  name: String,
  email: String,
  orders: [taskSchema], // array of subdocuments
});

const TaskDistributed = mongoose.model("TaskDistributed", AgentTaskSchema);
module.exports = TaskDistributed;

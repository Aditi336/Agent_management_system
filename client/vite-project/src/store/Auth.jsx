import React from "react";
import {  createContext,useContext,useState } from "react";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';

import {toast,ToastContainer} from 'react-toastify'

import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

export const AuthContext=createContext()

export const AuthProvider=(props)=>{
    const navigate=useNavigate();
    // user details
    const [user,setuser]=useState("")
    const [token,settoken]=useState(localStorage.getItem("token"))

    const storetokenInLS=(serverToken)=>{
        settoken(serverToken)
        return localStorage.setItem("token",serverToken)
    }

    let isLoggedIn=!!token
    // console.log("isLoggedIN",isLoggedIn)

    const LogoutUser=()=>{
        settoken("")
        return localStorage.removeItem("token")
    }

    // getting user data
    const getUser=async()=>{
        try{
            const response=await fetch("http://localhost:5000/api/auth/user",{
                method:"GET",
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            })
            if(response.ok){
                const data=await response.json()
                // console.log(data)
                setuser(data.userData)//???
                console.log("mydata",data.userData)
            }
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getUser()
        // console.log(user)
    },[])

    // getting agent details
    const [Agents,setAgents]=useState([])
    const getAgent_display=async()=>{
        try {
            const response=await fetch("http://localhost:5000/api/agent_auth/getagents",{
                method:"GET"
            })

            if(response.ok){
                const data=await response.json()
                // console.log("mobile",data.msg)
                setAgents(data.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getAgent_display()
    },[])

    // adding agents
    const [newAgents,setnewAgents]=useState({
        name:"",
        email:"",
        countrycode:"+91",
        phone:"",
        password:"",
    })

    const handleInput = (e) => {
  const { name, value } = e.target;
//   console.log("new netry",name,value);
  setnewAgents(prev => ({
    ...prev,
    [name]: value
  }));
}


    const handleSubmit=async(e)=>{
        e.preventDefault()
        // console.log(newAgents)
        try {
            const response=await fetch(`http://localhost:5000/api/agent_auth/agents`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(newAgents),
            });

            // console.log("Sending data:", response.json());

            const res_data=await response.json()
            // console.log(res_data,"agentssssssss")

            if(response.ok){
                // console.log("new agents details",res_data)
                toast.success("Added new Agent successfull")
                setnewAgents({name:"",email:"",countrycode:"",phone:"",password:""})
                navigate("/view_agents")
            }
            else{
                toast.error(res_data.extraDetails)
                // console.log(res_data.extraDetails,res_data.message)
            }
            
        } catch (error) {
            console.log(error)
        }


    }
    
    const handleReset=()=>{
        setnewAgents({name:"",email:"",countrycode:"",phone:"",password:""})
    }
    // uploading files and data parsed in json format
    // performing additonal check like header has to be FirstName,Phone,Name
    const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      const expectedHeaders = ["FirstName", "Phone", "Notes"];
      const fileHeaders = Object.keys(parsedData[0]);
      const missingHeaders = expectedHeaders.filter(h => !fileHeaders.includes(h));

    if (missingHeaders.length > 0) {
      alert(`Invalid file format. Missing headers: ${missingHeaders.join(", ")}`);
      return;
    }
    const isValid = parsedData.every(entry => 
      typeof entry.FirstName === "string" &&
      typeof entry.Notes === "string" &&
      /^\d+$/.test(entry.Phone?.toString())
    );

    if (!isValid) {
      alert("Some rows contain invalid data. 'Phone' must be a number.");
      return;
    }
      setData(parsedData);
    };
  }

//   parsed json data converted into array format for easy retreival
  const [newdata, setnewdata] = useState([]);

const Conversion = async () => {
  const transformedData = data.map(row => Object.values(row));
  setnewdata(transformedData);
};
useEffect(()=>{
    Conversion()
},[data]);

/*   ditribute the uploaded task and divided in 2 ways
    1. if length of agents % task same divides in such a way that all agents have same number of tasks
    2. if length not equal tasks is divided synchronously
*/
  const[Task,setTask]=useState([]);
const handleDivison=async()=>{
    // console.log(data);
    const distributedTasks = [];
    if(data.length%Agents.length==0){
        n=data.length/Agents.length;//25/5=5

        let dataIndex = 0;

        Agents.forEach((agent) => {
        for (let j = 0; j < n; j++) {
            const task = newdata[dataIndex];
            // console.log(task[0]);
            if (task) {
            distributedTasks.push({
                name: agent.name,
                email: agent.email,
                taskname: task[0],
                phone: task[1],
                notes: task[2],
            });

            dataIndex++;
            }
        }
        });

        setTask(distributedTasks);
    }
    else{
        let i=0;
        let j=0;
        while(i<Agents.length && j<data.length){
            const agent=Agents[i];
            const task=newdata[j];
            // console.log(task[0]);
            distributedTasks.push({
                name: agent.name,
                email: agent.email,
                taskname: task[0],
                phone: task[1],
                notes: task[2],
            });
            i++;
            j++;
        }
        setTask(distributedTasks);
    }
}
// task and agents list uploaded to mongo
const uploadData=async()=>{
    try{
            console.log(Task,"task printing");
            const response=await fetch(`http://localhost:5000/api/AgentTask/task_to_agent`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(Task),
                });

            const res_data=await response.json();
            // console.log(res_data,"agentssssssss");

            if(response.ok){
                console.log("new agents details",res_data);
                toast.success("Distributed tasks successfull");
                setTask([]);
            }
            else{
                toast.error(res_data.extraDetails)
                // console.log(res_data.extraDetails,res_data.message)
            }
    }catch(error){
        console.log(error);
    }

  }
//   to get list of agent to Task assignment
  const [TaskAgents,setTaskAgents]=useState([])

    const getTaskAgent_display=async(email)=>{
        try {
            const response=await fetch(`http://localhost:5000/api/AgentTask/view_agents_task`,{
                method:"GET"
            })

            if(response.ok){
                const data=await response.json()
                // console.log("mobile",data.msg)
                
                setTaskAgents(data.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getTaskAgent_display();
    }, []);

  
    const contextValue={
        
        isLoggedIn,
        user,
        storetokenInLS,
        LogoutUser,
        Agents,
        newAgents,
        setnewAgents,
        handleInput,
        handleReset,
        handleSubmit,
        data,
        Task,
        handleFileUpload,
        handleDivison,
        uploadData,
        getTaskAgent_display,
        TaskAgents


    }
    return(
        <AuthContext.Provider value={contextValue}> 
            {props.children}
        </AuthContext.Provider>
    )

}

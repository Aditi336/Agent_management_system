import { useContext } from "react"
import { AuthContext } from "../store/Auth"
import "../css/agent.css" 
import { useNavigate } from "react-router-dom"
export const DisplayAgents = () => {
    const { Agents,getTaskAgent_display } = useContext(AuthContext)
    // console.log("home user", Agents)
    const navigate=useNavigate()
    const handleAddition=()=>{
        navigate("/addagents")
    }
    const handleTask=(email)=>{
        navigate(`/view_agent/${email}`)
    }
    return (
        <>
            <h2 className="agent-heading">Agents</h2>
            <div className="agent-grid" >
                {Agents.map((curElem, index) => (
                    <div className="agent-card" key={index} onClick={()=>handleTask(curElem.email)}>
                        <div className="agent-name">{curElem.name}</div>
                        <div className="agent-email">{curElem.email}</div>
                        <div className="agent-phone">{curElem.countrycode}-{curElem.phone}</div>
                        
                    </div>
                ))}
            </div>
            <div className="plus-button" onClick={()=>handleAddition()}>+</div>
        </>
    )
}

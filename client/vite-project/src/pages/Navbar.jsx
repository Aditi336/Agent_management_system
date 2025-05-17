import { useContext } from "react"
import "../css/navbar.css"
import { AuthContext } from "../store/Auth"
import { Link } from "react-router-dom";
export const Navbar=()=>{
    const {user}=useContext(AuthContext)
    // console.log("home user",user)
    return(
        <div className="navbar">
        <div className="user-container">
        <div className="user-logo">AgentM</div>
        <div className="username-box">
            👤{user.username}
        </div>
        </div>

        <nav >
         <ul className="nav-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/logout">Logout</Link></li>
        <li><Link to="/view_agents">View Agents</Link></li>
        <li><Link to="/addagents">Add Agents</Link></li>
        <li><Link to="/distribute_task">Distribute Task</Link></li>
      </ul>
    </nav>
        </div>
    )
}
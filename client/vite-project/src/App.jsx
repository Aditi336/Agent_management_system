import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import {Home} from "./pages/Home"
import { Register } from "./pages/Register"
import { Login } from "./pages/Login"
import Logout from "./pages/Logout"
import { DisplayAgents } from "./pages/DisplayAgents"
import {AddAgents} from "./pages/AddAgents"
import {DistributeContents} from "./pages/DistributeContents"
import {Sample} from "./pages/Sample"
import { Navbar } from "./pages/Navbar";
import {DisplayTaskAgents} from "./pages/DisplayTaskAgents"
import { Footer } from "./pages/Footer"
 const App=()=>{

  return(
    // <div style={{backgroundColor:"black"}}>
    <div>
    <Navbar />

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path="/view_agents" element={<DisplayAgents/>}/>
      <Route path="/addagents" element={<AddAgents/>}/>
      <Route path="distribute_task" element={<DistributeContents/>}/>
      <Route path="/view_agent/:email" element={<DisplayTaskAgents/>}/>
            {/* <Route path="/sample" element={<Sample/>}/> */}

   

    </Routes>
    <Footer/>

    </div>
  )
}
export default App
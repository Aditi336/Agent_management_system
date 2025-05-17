import { useContext, useState } from "react"
import { useNavigate,NavLink } from "react-router-dom"
import "../css/login.css"
import { AuthContext } from "../store/Auth"
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


export const Login=()=>{

    const [User,setUser]=useState({
        email:"",
        password:""
    })

    const handleInput=(e)=>{
       let name=e.target.name;
       let value=e.target.value;

       setUser({
        ...User,
        [name]:value
       })
    }

    const navigate=useNavigate()
    const {storetokenInLS}=useContext(AuthContext)

    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log(User)

        try {
            
            const response=await fetch(`http://localhost:5000/api/auth/login`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(User)
            })

            console.log(response)

            
            const res_data=await response.json()

            if(response.ok){
                console.log("login details ",res_data)
                toast.success("login successfull")
                toast.info("Please refersh the page to see updated profile");
                storetokenInLS(res_data.token)
                setUser({email:"",password:""})
                navigate("/")
            }else{
                toast.error(res_data.extraDetails)
                console.log(res_data,"qwertyui")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleReset=()=>{
        setUser({email:"",password:""})
    }
    return(
        <>
        <h1 id="header-login">Login here!!</h1>
        <div >
            <form  onSubmit={handleSubmit}>
                <table id="table-login">
                <tr>
                <th><label htmlFor="email">email</label></th>
                <td><input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                required
                value={User.email}
                onChange={handleInput}/></td>
                </tr>
                
                <tr>
                <th><label htmlFor="password">password</label></th>
                <td><input
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                required
                value={User.password}
                onChange={handleInput}/></td>
                </tr>

                <tr>
                    <th><button type="submit" id="submit-login">Submit</button></th>
                    
                    <td><button type="reset" id="reset-login" onClick={handleReset}>Reset</button></td>
                    
                </tr>
                <div id="link-to-register"><NavLink to="/register" id="navlink-register">Don't have account?</NavLink></div>
                </table>

            </form>
            
        </div>
        </>
    )
}
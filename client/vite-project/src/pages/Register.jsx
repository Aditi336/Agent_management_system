import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import "../css/register.css"
import { AuthContext } from "../store/Auth";
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const Register=()=>{

    const [User,setUser]=useState({
        username:"",
        email:"",
        phone:"",
        password:"",
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
            const response=await fetch(`http://localhost:5000/api/auth/register`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(User),
            });

            const res_data=await response.json()

            if(response.ok){
                console.log(response)
                console.log("registration details",res_data)
                toast.success("registration successfull")
                storetokenInLS(res_data.token)
                setUser({username:"",email:"",phone:"",password:""})
                navigate("/login")
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
        setUser({username:"",email:"",phone:"",password:""})
    }
    return(
        <div id="registration">
        <h1 id="header-register">Registration</h1>
        <div>
            <form  onSubmit={handleSubmit}>
                <table id="table-register">
                <tr>
                <th><label htmlFor="username">username</label></th>
                <td><input
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                required
                value={User.username}
                onChange={handleInput}/></td>
                </tr>
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
                <th><label htmlFor="phone">phone</label></th>
                <td><input
                type="number"
                name="phone"
                id="phone"
                autoComplete="off"
                required
                value={User.phone}
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
                    <th><button type="submit" id="submit-register">Submit</button></th>
                    
                    <td><button type="reset" id="reset-register"onClick={handleReset}>Reset</button></td>
                </tr>
                </table>
            </form>
        </div>
        </div>
    )
}
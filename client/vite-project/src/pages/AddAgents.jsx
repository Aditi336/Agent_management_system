import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import "../css/register.css"
import { AuthContext } from "../store/Auth";
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const AddAgents=()=>{
    // importing function from Authjs 
    const {newAgents,handleInput,handleReset,handleSubmit}=useContext(AuthContext)
    
    return(
        <div id="registration">
        <h1 id="header-register">Add Agents</h1>
        <div>
            <form  onSubmit={handleSubmit}>
                <table id="table-register">
                <tr>
                <th><label htmlFor="name">name</label></th>
                <td><input
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                required
                value={newAgents.name}
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
                value={newAgents.email}
                onChange={handleInput}/></td>
                </tr>
                <tr>
                <th><label htmlFor="countrycode">Country Code:</label></th>
                <td>
                 <select id="countrycode" name="countrycode" value={newAgents.countrycode} onChange={handleInput} required >
                <option value="+91" selected>🇮🇳 </option>
                <option value="+1">🇺🇸 </option>
                <option value="+44">🇬🇧</option>
                <option value="+61">🇦🇺 </option>
                <option value="+81">🇯🇵 </option>
                </select>

                </td>
                </tr>

                <tr>
                <th><label htmlFor="phone">phone</label></th>
                <td><input
                type="number"
                name="phone"
                id="phone"
                autoComplete="off"
                required
                value={newAgents.phone}
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
                value={newAgents.password}
                onChange={handleInput}/></td>
                </tr>

                <tr>
                    <th><button type="submit" id="submit-register"onClick={handleSubmit}>Add</button></th>
                    
                    <td><button type="reset" id="reset-register"onClick={handleReset}>Reset</button></td>
                </tr>
                </table>
            </form>
        </div>
        </div>
    )
}
import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";

import "../css/InputFieldPage.css"
import logo from "../images/UCF_Logo_Clean_Horizontal_Alt.jpg"  
import { AuthContext } from '../useContext/LoginContext';


function Register()
{

    const {currentUser, setCurrentUser} = useContext(AuthContext);
    let registerFirstName;
    let registerLastName;
    let registerUsername;
    let registerPassword;
    let phone;
    let email;

    const [message,setMessage] = useState('');

    const doRegister = async event => 
    {

        const app_name = 'cop-study-buddy-1000'
        function buildPath(route){
            if (process.env.NODE_ENV === 'production')
            {
                return 'https://' + app_name +  '.herokuapp.com/' + route;
            }
            else
            {
                return 'http://localhost:5000/' + route;
            }
        }

        event.preventDefault();

        var obj = {firstName:registerFirstName.value, lastName:registerLastName.value, username:registerUsername.value, password:registerPassword.value, phone:phone.value,email:email.value};
        var js = JSON.stringify(obj);
        console.log(obj);

        try
        {    
            const response = await fetch(buildPath('api/register'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if(!res._id)
            {
                setMessage('Please check your submission');
            }
            else
            {
                var user = {firstName:res.firstName,lastName:res.lastName,id:res._id}
                localStorage.setItem('user_data', JSON.stringify(user));

                setCurrentUser(res);
                console.log(currentUser);
                setMessage('Works');
                console.log(user);

                navigate("/login");

            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
     };


     
    const navigate = useNavigate();

    const handleLogoClick = (e) => {
      e.preventDefault();

      navigate("/");



    }

    const handleLoginClick = (e) =>{
        e.preventDefault();

        navigate("/login");
    }


    return(
        <div id="loginDiv" style={{height:500}}>
            <a className='hover' onClick={(e) => {handleLogoClick(e)}} > <img className='logo' src={logo} alt="" /></a>
        
          <form onSubmit={doRegister}>
          <input className="mt-2 input-field" type="text" id="registerFirstName" placeholder="First Name" ref={(c) => registerFirstName = c} /><br />
          <input className="mt-3 input-field" type="text" id="registerLastName" placeholder="Last Name" ref={(c) => registerLastName = c} /><br />
          <input className="mt-3 input-field" type="text" id="registerUsername" placeholder="Username" ref={(c) => registerUsername = c} /><br />
          <input className="mt-3 input-field" type="password" id="registerPassword" placeholder="Password" ref={(c) => registerPassword = c} /><br />
          <input className="mt-3 input-field"  type="phone" placeholder='Phone Number' ref={(c) => phone = c} /><br />
          <input className="mt-3 input-field"  type="email" placeholder='Email' ref={(c) => email = c} /><br />
          <input className="mt-4 variant1-btn" type="submit" id="registerButton"  value = "Register" onClick={doRegister} />
          </form>
          <button className="mt-2 variant2-btn" onClick={(e) => {handleLoginClick(e)}}>Have an account? Login</button>
          <span className="mt-2" id="registerResult">{message}</span>

       </div>
      );
};

export default Register;
import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";

import "../css/InputFieldPage.css"
import logo from "../images/UCF_Logo_Clean_Horizontal_Alt.jpg"  
import { AuthContext } from '../useContext/LoginContext';


function Register()
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



    const doLogin = async () => 
    {
        var obj = {username:registerUsername.value,password:registerPassword.value};
        var js = JSON.stringify(obj);
        console.log(obj);
        try
        {    
          const [ username , password ] = js;
          // setCurrentUser({email: "adam",firstName:"New",lastName: "New",token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjUwZTc2OTAyMjAyMmMyODEwOGNiNyIsImlhdCI6MTY4MTk0ODcxMiwiZXhwIjoxNjg0NTQwNzEyfQ.3Ura0EvSlmN53hEprKGQ7RfJe-RRJVRld2FomDFbGT4",username: "New",_id: "64250e769022022c28108cb7"});
          // console.log(currentUser);
          console.log(username);
          console.log(password);
          console.log(js);
            const response = await fetch(buildPath('api/login'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            

            var res = JSON.parse(await response.text());
            console.log(res)

            if(!res._id)
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
              setCurrentUser(res);          
              console.log(currentUser);
                // window.location.href = '/';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };

    const {currentUser, setCurrentUser} = useContext(AuthContext);
    let registerFirstName;
    let registerLastName;
    let registerUsername;
    let registerPassword;
    let phone;
    let email;
    let code;

    const [message,setMessage] = useState('');
    const [show, setShow] = useState(false);
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
                console.log(res);
                setCurrentUser(res);
                console.log(currentUser);
                doLogin();    
                setMessage('Please check your email for verification code.');
                setShow(true)

            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
     };

     const doVerify = async event => 
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

        var obj = {username:currentUser.username, codeInput:code.value};
        var js = JSON.stringify(obj);
        console.log(obj);

        try
        {    
            const response = await fetch(buildPath('api/verifyUser'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if(!res._id)
            {
                setMessage('Verification Code Error. Please try again.');
            }
            else
            {
                var user = {firstName:res.firstName,lastName:res.lastName,id:res._id}
                localStorage.setItem('user_data', JSON.stringify(user));

                setCurrentUser(res);
                console.log(currentUser);
                setMessage('Verification Success');
                console.log(user);
                navigate("/");

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

    const handleLoginClick = (e) => {
        e.preventDefault();
  
        navigate("/login");
  
      }


    return(
        <div id="registerDiv" style={show ?{ 'height':400}: {'height':500}}>
            <a className='hover' onClick={(e) => {handleLogoClick(e)}} > <img className='logo' src={logo} alt="" /></a>
            { !show ?
            <form onSubmit={doRegister}>
                <input className="mt-2 input-field" type="text" id="registerFirstName" placeholder="First Name" ref={(c) => registerFirstName = c} /><br />
                <input className="mt-3 input-field" type="text" id="registerLastName" placeholder="Last Name" ref={(c) => registerLastName = c} /><br />
                <input className="mt-3 input-field" type="text" id="registerUsername" placeholder="Username" ref={(c) => registerUsername = c} /><br />
                <input className="mt-3 input-field" type="password" id="registerPassword" placeholder="Password" ref={(c) => registerPassword = c} /><br />
                <input className="mt-3 input-field"  type="phone" placeholder='Phone Number' ref={(c) => phone = c} /><br />
                <input className="mt-3 input-field"  type="email" placeholder='Email' ref={(c) => email = c} /><br />
                <input className="mt-4 variant1-btn" type="submit" id="registerButton"  value = "Register" onClick={doRegister} />
            </form>
            : null}   
            {show ?
            <form onSubmit={doVerify}>
                <p className='mt-3'>A verification email has been sent to your email.</p>
                <input className="mt input-field"  type="text" placeholder='Verification Code' ref={(c) => code = c} /><br />
                <input className="mt-4 variant1-btn" type="submit" id="verifyButton"  value = "Verify" onClick={doVerify} />
            </form>
             : null}
            <button className="mt-2 variant2-btn" onClick={(e) => {handleLoginClick(e)}}>Have an account? Login</button>
            {show ? <button className="mt-2 variant2-btn" onClick={(e) => {navigate('/')}}>Skip to Home page</button> : null}
            <span className="mt-2" id="registerResult">{message}</span>

       </div>
      );
};

export default Register;
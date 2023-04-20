import React, { useState , useContext} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import "../css/InputFieldPage.css"
import logo from "../images/UCF_Logo_Clean_Horizontal_Alt.jpg"  
import { AuthContext } from '../useContext/LoginContext';


function Login()
{
  const {currentUser, setCurrentUser} = useContext(AuthContext);

  const app_name = 'cop-study-buddy-1000'

function buildPath(route)
{
    if (process.env.NODE_ENV === 'production')
    {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else
    {
        return 'http://localhost:5000/' + route;
    }
}


const navigate = useNavigate();
  var loginName;
    var loginPassword;

    const [message,setMessage] = useState('');

    const doLogin = async event => 
    {
        event.preventDefault();

        var obj = {username:loginName.value,password:loginPassword.value};
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
                var user = {firstName:res.firstName,lastName:res.lastName,id:res._id}
                // setCurrentUser(user);
                localStorage.setItem('user_data', JSON.stringify(user));

                setCurrentUser(res);
                console.log(currentUser);

                navigate("/");
                // window.location.href = '/';

            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };



    const handleLogoClick = (e) => {
      e.preventDefault();
      navigate("/");
    }

    return(
      <div id="loginDiv">
        <a className='hover' onClick={(e) => {handleLogoClick(e)}} > <img className='logo' src={logo} alt="" /></a>
        <form onSubmit ={doLogin}>
          <input className='input-field mt-3' type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c} /><br />
          <input className='mt-3 input-field' type="password" id="loginPassword" placeholder="Password"  ref={(c) => loginPassword = c} /><br />
          <input className='mt-5 variant1-btn' type="submit" id="loginButton"  value = "Login" onClick={doLogin} />
        </form>
        <button className='mt-3 variant2-btn' onClick={(e) => {e.preventDefault();navigate("/register");}}>Dont have an account? Click to register</button>
        <button className='mt-3 variant2-btn' onClick={(e) => {e.preventDefault();navigate("/");}}>Forgot password? Reset here</button>
      <span id="loginResult">{message}</span>
     </div>
    );
};

export default Login;
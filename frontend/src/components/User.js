import React, { useState , useContext} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../useContext/LoginContext';

import "../css/InputFieldPage.css"
import logo from "../images/UCF_Logo_Clean_Horizontal_Alt.jpg"  


function User()
{

  //  const {currentUser, setCurrentUser} = useContext(AuthContext);

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

  var userFirstName;
  var userLastName;
  var userPhoneNumber;
  var userPassword;

  var loginName;
  var loginPassword;

    const [message,setMessage] = useState('');

    const doUser = async event => 
    {
        event.preventDefault();

        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);
        console.log(obj);
        try
        {    
          const [ login, password ] = js;

          console.log(login);
          console.log(password);
          console.log(js)
            const response = await fetch(buildPath('api/login'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            

            var res = JSON.parse(await response.text());
            console.log(res)

            if( res._id <= 0 )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                var user = {firstName:res.firstName,lastName:res.lastName,id:res._id}
                console.log(user);
                // setCurrentUser(user);
                localStorage.setItem('user_data', JSON.stringify(user));
                
                setMessage('Works');
                window.location.href = '/';
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

    return(
      <div id="userDiv">
        <a className='hover' onClick={(e) => {handleLogoClick(e)}} > <img className='logo' src={logo} alt="" /></a>
        <form onSubmit ={doUser}>
          <input className='input-field mt-3' type="text" id="userFirstName" placeholder="New First Name" ref={(c) => userFirstName = c} /><br />
          <input className='input-field mt-3' type="text" id="userLastName" placeholder="New Last Name"  ref={(c) => userLastName = c} /><br />
          <input className='input-field mt-3' type="text" id="userPhoneNumber" placeholder="New Phone Number" ref={(c) => userPhoneNumber = c} /><br />
          <input className='input-field mt-3' type="password" id="userPassword" placeholder="New Password" ref={(c) => userPassword = c} /><br />
          <input className='variant1-btn mt-3' type="submit" id="userButton"  value = "Upload" onClick={doUser} />
        </form>
      <span id="userResult">{message}</span>
     </div>
    );
};

export default User;
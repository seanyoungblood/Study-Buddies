import React, { useState , useContext} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../useContext/LoginContext';
import { Link } from 'react-router-dom';

import "../css/InputFieldPage.css"
import logo from "../images/UCF_Logo_Clean_Horizontal_Alt.jpg"  


function User()
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

  var userFirstName = currentUser.firstName;
  var userLastName = currentUser.lastName;
  var userPhoneNumber = currentUser.phone;
  var userPassword;

  var loginName;
  var loginPassword;

    const [message,setMessage] = useState('');


    const doUser = async event => 
    {
        event.preventDefault();

        var obj = {login:userFirstName.value,lastName:userLastName.value, phone:userPhoneNumber.value, username:currentUser.username};
        var js = JSON.stringify(obj);
        console.log(obj);
        try
        {    
          const [ login, password ] = js;

          console.log(login);
          console.log(password);
          console.log(js)
            const response = await fetch(buildPath('api/editUser'),
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
                navigate('/');
                setMessage('Works');
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

      navigate("/profile");



    }

    return(
      <div id="userDiv">
        <a className='hover' onClick={(e) => {handleLogoClick(e)}} > <img className='logo' src={logo} alt="" /></a>
        <form onSubmit ={doUser}>
          <input className='input-field mt-3' type="text" id="userFirstName" placeholder={currentUser.firstName !== '' ? currentUser.firstName : "New First Name"} ref={(c) => userFirstName = c} /><br />
          <input className='input-field mt-3' type="text" id="userLastName" placeholder={currentUser.lastName !== '' ? currentUser.lastName : "New Last Name"}  ref={(c) => userLastName = c} /><br />
          <input className='input-field mt-3' type="text" id="userPhoneNumber" placeholder= {currentUser.phone !== '' ? currentUser.phone : "New Phone"} ref={(c) => userPhoneNumber = c} /><br />
          <input className='input-field mt-3' type="password" id="userPassword" placeholder="New Password"/><br />
          <Link to="/" className='variant1-btn mt-3 edit-user-btn' type="submit" id="userButton" onClick={doUser}>Edit user</Link>
        </form>
      <span id="userResult">{message}</span>
     </div>
    );
};

export default User;
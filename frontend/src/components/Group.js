import React, { useState , useContext} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../useContext/LoginContext';

import "../css/LoginRegisterGroupPage.css"
import logo from "../images/UCF_Logo_Clean_Horizontal_Alt.jpg"  


function Group()
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

  var groupName;
  var groupSummary;
  var groupClass1;
  var groupClass2;
  var groupClass3;
  var groupClass4;
  var groupClass5;

  var loginName;
  var loginPassword;

    const [message,setMessage] = useState('');

    const doGroup = async event => 
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
      <div id="groupDiv">
        <a className='hover' onClick={(e) => {handleLogoClick(e)}} > <img className='logo' src={logo} alt="" /></a>
        <form onSubmit ={doGroup}>
          <input className='input-field mt-3' type="text" id="groupName" placeholder="Group Name" ref={(c) => groupName = c} /><br />
          <input className='input-field mt-3' type="text" id="groupSummary" placeholder="Group Summary"  ref={(c) => groupSummary = c} /><br />
          <input className='input-field mt-3' type="text" id="groupClass1" placeholder="Group Related Class" ref={(c) => groupClass1 = c} /><br />
          <input className='input-field mt-1' type="text" id="groupClass2" placeholder="Group Related Class" ref={(c) => groupClass2 = c} /><br />
          <input className='input-field mt-1' type="text" id="groupClass3" placeholder="Group Related Class" ref={(c) => groupClass3 = c} /><br />
          <input className='input-field mt-1' type="text" id="groupClass4" placeholder="Group Related Class" ref={(c) => groupClass4 = c} /><br />
          <input className='input-field mt-1' type="text" id="groupClass5" placeholder="Group Related Class" ref={(c) => groupClass5 = c} /><br />
          <input className='variant1-btn mt-4' type="submit" id="groupButton"  value = "Create/Edit" onClick={doGroup} />
        </form>
      <span id="groupResult">{message}</span>
     </div>
    );
};

export default Group;
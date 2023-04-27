import React, { useState , useContext} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../useContext/LoginContext';
import { Link } from 'react-router-dom';

import "../css/InputFieldPage.css"
import logo from "../images/UCF_Logo_Clean_Horizontal_Alt.jpg"  


function Group()
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

  var groupName;
  var groupSummary;
  var groupObjective;
  var groupDate;
  var groupTime;
  var groupLocation;


    const [message,setMessage] = useState('');

    const doGroup = async event => 
    {
        event.preventDefault();

        var obj = {groupName:groupName.value, course:groupSummary.value, objective:groupObjective.value,date:groupDate.value,time:groupTime.value,location:groupLocation.value};
        var js = JSON.stringify(obj);
        console.log(obj);
        try
        {    
            const response = await fetch(buildPath('api/registerGroup'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${currentUser.token}`}});
            

            var res = JSON.parse(await response.text());
            console.log(res)

            if( !res.admin)
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
              let user = currentUser;
              user.groupsIn.push(groupName)
              setCurrentUser(user)
                console.log(currentUser);

                setMessage('Works');
                navigate('/studygroups');
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
          <input className='input-field mt-3' type="text" id="groupSummary" placeholder="Group Course"  ref={(c) => groupSummary = c} /><br />
          <input className='input-field mt-3' type="text" id="groupClass1" placeholder="Objective" ref={(c) => groupObjective = c} /><br />
          <input className='input-field mt-1' type="text" id="groupClass2" placeholder="Date" ref={(c) => groupDate = c} /><br />
          <input className='input-field mt-1' type="text" id="groupClass3" placeholder="Time" ref={(c) => groupTime = c} /><br />
          <input className='input-field mt-1' type="text" id="groupClass4" placeholder="Location" ref={(c) => groupLocation = c} /><br />
          <Link to="/" className='variant1-btn mt-4 edit-user-btn' type="submit" id="groupButton" onClick={doGroup} >Create group</Link>
        </form>
      <span id="groupResult">{message}</span>
     </div>
    );
};

export default Group;
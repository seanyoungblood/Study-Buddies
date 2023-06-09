import React, { useState , useContext} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../useContext/LoginContext';
import { Link } from 'react-router-dom';

import "../css/InputFieldPage.css"
import logo from "../images/UCF_Logo_Clean_Horizontal_Alt.jpg" 


function Classes()
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
        return 'http://localhost:3001/' + route;
    }
}

  var RegisterClass1;
  var RegisterClass2;
  var RegisterClass3;
  var RegisterClass4;
  var RegisterClass5;
  var RegisterClass6;

  var loginName;
  var loginPassword;

  const navigate = useNavigate();
    const [message,setMessage] = useState('');
    const {currentUser, setCurrentUser} = useContext(AuthContext)
    const doClasses = async() => 
    {
      const name = currentUser.username;

        var obj = {username:name, class0:RegisterClass1.value, class1:RegisterClass2.value,class2:RegisterClass3.value,class3:RegisterClass4.value,class4:RegisterClass5.value,class5:RegisterClass6.value};
        var js = JSON.stringify(obj);
        console.log(obj);
        try
        {    
            const response = await fetch(buildPath('api/addClasses'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${currentUser.token}`}});
          
            var res = JSON.parse(await response.text());
            console.log(res)

            if(!res._id)
            {
                setMessage('please try again.');
            }
            else
            {
                setCurrentUser({...currentUser,classesTaking:res.classesTaking})
                console.log(res);
                console.log(res.classesTaking)
                console.log(currentUser);
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

      navigate("/profile");

    }

    return(
      <div id="classDiv">
        <a className='hover' onClick={(e) => {handleLogoClick(e)}} > <img className='logo' src={logo} alt="" /></a>
        <form className='form'>
          <input className='input-field mt-3' type="text" id="class1" placeholder="Your Class Here" ref={(c) => RegisterClass1 = c} /><br />
          <input className='input-field mt-1' type="text" id="class2" placeholder="Your Class Here" ref={(c) => RegisterClass2 = c} /><br />
          <input className='input-field mt-1' type="text" id="class3" placeholder="Your Class Here" ref={(c) => RegisterClass3 = c} /><br />
          <input className='input-field mt-1' type="text" id="class4" placeholder="Your Class Here" ref={(c) => RegisterClass4 = c} /><br />
          <input className='input-field mt-1' type="text" id="class5" placeholder="Your Class Here" ref={(c) => RegisterClass5 = c} /><br />
          <input className='input-field mt-1' type="text" id="class5" placeholder="Your Class Here" ref={(c) => RegisterClass6 = c} /><br />
          <Link to="/profile" type="submit" className="variant1-btn mt-3 edit-user-btn d-block align-center-btn" onClick={doClasses}>Change classes</Link>
        </form>
     </div>
    );
};

export default Classes;

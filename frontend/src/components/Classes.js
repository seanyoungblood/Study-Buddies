import React, { useState , useContext} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../useContext/LoginContext';

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
        return 'http://localhost:5000/' + route;
    }
}

  var class1;
  var class2;
  var class3;
  var class4;
  var class5;
  var class6;

  var loginName;
  var loginPassword;

    const [message,setMessage] = useState('');
    const {currentUser, setCurrentuser} = useContext(AuthContext)
    const doClasses = async event => 
    {
        event.preventDefault();

        var obj = {username:currentUser.username, class0:class1, class1:class2,class2:class3,class3:class4,class4:class5,class5:class6};
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

            if(!res._id)
            {
                setMessage('please try again.');
            }
            else
            {
                var users = {firstName:res.firstName,lastName:res.lastName,id:res._id}
                console.log(users);
                // setCurrentUser(user);
                localStorage.setItem('user_data', JSON.stringify(user));
                const user = currentUser;
                
                user.classesTaking = [class1,class2,class3,class4,class5,class6];
                setCurrentuser(user);
                console.log(currentUser)
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
      <div id="classDiv">
        <a className='hover' onClick={(e) => {handleLogoClick(e)}} > <img className='logo' src={logo} alt="" /></a>
        <form onSubmit ={doClasses}>
          <input className='input-field mt-3' type="text" id="class1" placeholder="Your Class Here" ref={(c) => class1 = c} /><br />
          <input className='input-field mt-1' type="text" id="class2" placeholder="Your Class Here" ref={(c) => class2 = c} /><br />
          <input className='input-field mt-1' type="text" id="class3" placeholder="Your Class Here" ref={(c) => class3 = c} /><br />
          <input className='input-field mt-1' type="text" id="class4" placeholder="Your Class Here" ref={(c) => class4 = c} /><br />
          <input className='input-field mt-1' type="text" id="class5" placeholder="Your Class Here" ref={(c) => class5 = c} /><br />
          <input className='input-field mt-1' type="text" id="class5" placeholder="Your Class Here" ref={(c) => class6 = c} /><br />
          <input className='variant1-btn mt-4' type="submit" id="classesButton"  value = "Upload" onClick={doClasses} />
        </form>
      <span id="classesResult">{message}</span>
     </div>
    );
};

export default Classes;
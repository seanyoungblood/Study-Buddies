import React, { useState , useContext} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../useContext/LoginContext';
import { Link } from 'react-router-dom';

import "../css/InputFieldPage.css"
import logo from "../images/UCF_Logo_Clean_Horizontal_Alt.jpg"  


function Rating()
{

  const {currentUser, setCurrentUser} = useContext(AuthContext);
  var reviewValue;
  var name;

  const [message,setMessage] = useState('');

    const doReview = async event => 
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

      var obj = {username:currentUser.username, groupName:name.value, rating:reviewValue.value};
      var js = JSON.stringify(obj);
      console.log(obj);
        
      try
      {    
        const response = await fetch(buildPath('api/editRating'),
        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
          

        var res = JSON.parse(await response.text());
        console.log(res)

        if( res.firtName === '' )
        {
            setMessage('User/Password combination incorrect');
        }
        else
        {
            var user = {firstName:res.firstName,lastName:res.lastName,id:res._id}
            console.log(obj);
            // setCurrentUser(user);
            // currentUser.firstName = res.firstName;
            // currentUser.lastName = res.lastName;
            // currentUser.phone = res.phone;
            localStorage.setItem('user_data', JSON.stringify(user));
            navigate('/studygroups');
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

      navigate("/studygroups");

    }

    return(
      <div id="reviewDiv">
        <a className='hover' onClick={(e) => {handleLogoClick(e)}} > <img className='logo' src={logo} alt="" /></a>
        <form onSubmit ={doReview}>
          <input className='input-field mt-3' type="text" id="reviewValue" placeholder="Rate with value of 1 to 5" ref={(c) => reviewValue = c} /><br />
          <input className="variant1-btn mt-3 edit-user-btn" type="submit" id="userButton"  value = "Leave Review" onClick={doReview} />
        </form>
     </div>
    );
};

export default Rating;
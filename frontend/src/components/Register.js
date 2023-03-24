import React, { useState } from 'react';

function Register()
{
    let registerFirstName;
    let registerLastName;
    let registerUsername;
    let registerPassword;

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

        var obj = {firstName:registerFirstName.value, lastName:registerLastName.value, username:registerUsername.value, password:registerPassword.value};
        var js = JSON.stringify(obj);
        console.log(obj)

        try
        {    
            const response = await fetch(buildPath('api/register'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            // if( res.id <= 0 )
            // {
            //     setMessage('User/Password combination incorrect');
            // }
            // else
            // {
            //     var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
            //     localStorage.setItem('user_data', JSON.stringify(user));

            //     setMessage('');
            //     window.location.href = '/cards';
            // }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
     };

    return(
        <div id="registerDiv">
          <form onSubmit={doRegister}>
          <span id="inner-title">REGISTER HERE!</span><br />
          <input type="text" id="registerFirstName" placeholder="First Name" ref={(c) => registerFirstName = c} /><br />
          <input type="text" id="registerLastName" placeholder="Last Name" ref={(c) => registerLastName = c} /><br />
          <input type="text" id="registerUsername" placeholder="Username" ref={(c) => registerUsername = c} /><br />
          <input type="password" id="registerPassword" placeholder="Password" ref={(c) => registerPassword = c} /><br />
          <input type="submit" id="registerButton" class="buttons" value = "Do It"
            onClick={doRegister} />
          </form>
          <button onClick={() => {window.location.href = '/'}}>Have an account? Login</button>
          <span id="registerResult">{message}</span>

       </div>
      );
};

export default Register;
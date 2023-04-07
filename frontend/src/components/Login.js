import React, { useState , useContext} from 'react';
import { AuthContext } from '../useContext/LoginContext';
import "../css/LoginPage.css"

function Login()
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

  var loginName;
    var loginPassword;

    const [message,setMessage] = useState('');

    const doLogin = async event => 
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

    return(
      <div id="loginDiv" >
        <form onSubmit={doLogin}>
        <span id="inner-title">PLEASE LOG IN!</span><br />
          <input type="text" id="loginName" placeholder="Username" 
  ref={(c) => loginName = c} /><br />
<input type="password" id="loginPassword" placeholder="Password" 
  ref={(c) => loginPassword = c} /><br />
        <input type="submit" id="loginButton" className="buttons" value = "Do It"
          onClick={doLogin} />
        </form>
        <button onClick={(e) => {e.preventDefault();window.location.href = '/register'}}>Dont have an account register!</button>
      <span id="loginResult">{message}</span>
     </div>
    );
};

export default Login;
import '../css/ProfilePage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../useContext/LoginContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileContent = () => {

    const {currentUser, setCurrentUser} = useContext(AuthContext);

    // useEffect(() => {    const sample = {classesTaking:["test", "fake" , "asdasd"], groupsIn: ["asdad", "asdas", "GORUPS"]};
    // setCurrentUser(sample);},[])
    const navigate = useNavigate();
    const handleDelete = async (e) => 
    {
        e.preventDefault();
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


        var obj = {groupName: e.target.innerText};
        console.log(e.target.innerText)
        var js = JSON.stringify(obj);
        // currentUser.groupsIn.pop()
        // setCurrentUser(currentUser)
        // console.log(currentUser);

        try
        {    
            const response = await fetch(buildPath(`api/:${currentUser._id}/deleteGroup`),
            {method:'DELETE',body:js,headers:{'Content-Type': 'application/json' , 'Authorization': `Bearer ${currentUser.token}`}});

            var res = JSON.parse(await response.text());
            console.log(res);
            if(res.error === '')
            {
                console.log('Please check your submission');
            }
            else
            {
                currentUser.groupsIn.splice(currentUser.groupsIn.indexOf(e.target.innerText), 1);
                setCurrentUser(currentUser);
                console.log(currentUser);
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
     };
    

    return ( 
        <div className="row text-center mt-5 profile-classes-wrapper">
            <div className="col-md-6 col-sm-12">
                <h1 className="textbox profile-header">Classes</h1>
                {currentUser.classesTaking?.map((c)=>(
                        <div className='profile-classes' key={c}>
                            <p>{c}</p>
                        </div>
                    ))}
            </div>

            <div className="col-md-6 col-sm-12 margin-top">
                <h1 className="textbox profile-header">Groups</h1>
                {currentUser.groupsIn?.map((c)=>
                     (
                        <div onClick={(e) => {handleDelete(e)}} className='profile-classes profile-hover' key={c}>
                            <p>{c}</p>
                        </div>
                    ))}
            </div>
        </div>
     );
}
 
export default ProfileContent;
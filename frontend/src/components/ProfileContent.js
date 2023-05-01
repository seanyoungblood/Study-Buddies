import '../css/ProfilePage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../useContext/LoginContext';
import { useContext, useEffect, useState } from 'react';
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
                return 'http://localhost:3000/' + route;
            }
        }
        var obj = {groupName: e.target.innerText, username:currentUser.username};
        console.log(e.target.innerText)
        var js = JSON.stringify(obj);
        // currentUser.groupsIn.pop()
        // setCurrentUser(currentUser)
        // console.log(currentUser);

        try
        {    
            const response = await fetch(buildPath(`api/:${currentUser._id}/leaveGroup`),
            {method:'DELETE',body:js,headers:{'Content-Type': 'application/json' , 'Authorization': `Bearer ${currentUser.token}`}});

            var res = JSON.parse(await response.text());
            console.log(res);
            if(!res)
            {
                console.log('Please check your submission');
            }
            else
            {   
                let temp = currentUser;

                temp.groupsIn.splice(currentUser.groupsIn.indexOf(e.target.innerText), 1);
                setCurrentUser((prevState) => ({
                    ...prevState,
                    groupsIn:temp
                }));
                console.log(currentUser);
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
     };


     const [classes, setClasses] = useState([]);
     const [groups, setGroups] = useState([]);

     useEffect(() => {

        setClasses(currentUser.classesTaking);
        setGroups(currentUser.GroupsIn);
     },[currentUser]);
    

    return ( 
        <div className="row text-center mt-5 profile-classes-wrapper">
            <div className="col-md-6 col-sm-12">
                <h1 className="textbox profile-header">Classes</h1>
                {classes.map((c)=>(
                <div className='profile-classes' key={c}>
                    <p>{c}</p>
                </div>))}
            </div>

            <div className="col-md-6 col-sm-12 margin-top">
                <h1 className="textbox profile-header">Groups</h1>
<<<<<<< HEAD
                {groups.map((c)=>
                     (
=======
                {groups?.map((c)=>(
>>>>>>> c4e34879f67956ad1d3f2d69e77bfb178267e36c
                        <div onClick={(e) => {handleDelete(e)}} className='profile-classes profile-hover' key={c}>
                            <p>{c}</p>
                        </div>
                    ))}
            </div>
        </div>
     );
}
 
export default ProfileContent;
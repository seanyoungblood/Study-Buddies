import '../css/ProfilePage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../useContext/LoginContext';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileDelete = () => {
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
                // let temp = currentUser;

                // temp.groupsIn.splice(currentUser.groupsIn.indexOf(e.target.innerText), 1);
                console.log(res);
                setCurrentUser({...currentUser,groupsIn:res.groupsIn})
                console.log(currentUser);
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
     };


     const [classes, setClasses] = useState(["","","","","",""]);
     const [groups, setGroups] = useState([]);
     
     useEffect(() =>{
    setGroups(currentUser.groupsIn);
    setClasses(currentUser.classesTaking);
     },[currentUser])

    return ( 
        <div className="row text-center mt-5 profile-classes-wrapper">
            <div className="col-md-6 col-sm-12">
                <h1 className="textbox profile-header">Classes</h1>
                {/* {classes?.map((c)=>(
                <div className='profile-classes' key={c}>
                    <p>{c}</p>
                </div>))} */}

                <div className='profile-classes'>
                    <p>{classes[0]}</p>
                </div>
                <div className='profile-classes'>
                    <p>{classes[1]}</p>
                </div>
                <div className='profile-classes'>
                    <p>{classes[2]}</p>
                </div>
                <div className='profile-classes'>
                    <p>{classes[3]}</p>
                </div>
                <div className='profile-classes'>
                    <p>{classes[4]}</p>
                </div>
                <div className='profile-classes'>
                    <p>{classes[5]}</p>
                </div>


            </div>
        </div>
     );
}
 
export default ProfileDelete;
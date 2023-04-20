import { Link, useNavigate } from 'react-router-dom';
import '../css/ProfilePage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from '../useContext/LoginContext';

const ProfileButtons = () => {

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

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const navigate = useNavigate();
 
    const handleDelete = async() => 
    {
        

        var obj = {username:currentUser.userName};
        var js = JSON.stringify(obj);
        console.log(obj);
        try
        { 
            const response = await fetch(buildPath('api/deleteUser'),
                {method:'DELETE',body:js,headers:{'Content-Type': 'application/json'}});
            

            var res = JSON.parse(await response.text());
            console.log(res)

            if(error != '')
            {
                console.log("error on delete")
            }
            else
            {
                var user = {email: "",firstName:"", phone:"", lastName: "",token: "",username: "",_id: "", classesTaking:[], groupsIn:[]}
                // setCurrentUser(user);
                localStorage.setItem('user_data', JSON.stringify(user));

                setCurrentUser(user);
                console.log(currentUser);

                navigate("/");
                // window.location.href = '/';

            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };
    return ( 
        <div className="buttonRow text-center mt-5">
           <Link id="profileButton" to='/user'>Edit User</Link>
           <Link id="profileButton" to='/classes'>Change Classes</Link>


           <Button id='profileButton' onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
     );
}
 
export default ProfileButtons;
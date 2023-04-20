import { Link } from 'react-router-dom';
import '../css/ProfilePage.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfileButtons = () => {
    return ( 
        <div className="buttonRow text-center mt-5">
           <Link id="profileButton" to='/user'>Edit User</Link>
           <Link id="profileButton" to='/classes'>Change Classes</Link>
           <Link id="profileButton" to='/'>Delete Account</Link>
        </div>
     );
}
 
export default ProfileButtons;
import { Link } from 'react-router-dom';
import '../css/ProfilePage.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfileButtons = () => {
    return ( 
        <div className="buttonRow text-center mt-5">
            <button id="profileButton"><Link to='/user'>Edit User</Link></button>
            <button id="profileButton"><Link to='/classes'>Change Classes</Link></button>
            <button id="profileButton"><Link to='/'>Delete Account</Link></button>
        </div>
     );
}
 
export default ProfileButtons;
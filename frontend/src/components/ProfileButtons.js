import { Link } from 'react-router-dom';
import '../css/ProfilePage.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfileButtons = () => {
    return ( 
        <div className="row text-center mt-5">
            <ul>
                <li><Link to='/user'>Edit User</Link></li>
                <li><Link to='/classes'>Change Classes</Link></li>
                <li><Link to='/'>Delete Account</Link></li>
            </ul>
        </div>
     );
}
 
export default ProfileButtons;
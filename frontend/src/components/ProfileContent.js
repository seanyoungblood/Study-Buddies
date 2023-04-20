import '../css/ProfilePage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../useContext/LoginContext';
import { useContext } from 'react';

const ProfileContent = () => {

    const {currentUser} = useContext(AuthContext);
    return ( 
        <div className="row text-center mt-5">
            <div className="col-6">
                <h1 className="textbox profile-header">Classes</h1>
                {currentUser.classesTaking.map((c)=>(
                    <div key={c.id}>
                        <p>{c & c}</p>
                    </div>
                ))}</div>

            <div className="col-6">
                <h1 className="textbox profile-header">Groups</h1>
                <p className='text-center mb-5'>Placement text for groups</p>
            </div>
        </div>
     );
}
 
export default ProfileContent;
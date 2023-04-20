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
<<<<<<< HEAD
                <p className='text-center mb-5'> COP4200 - Programming Lang <br />
                    COT4035 - Big Discrete <br />
                    TTYL400 - Knight’s Library <br />
                    SING100 - Intro to Opera Singing</p>
            </div>
=======
                {currentUser.classesTaking.map((c)=>(
                    <div key={c.id}>
                        <p>{ c}</p>
                    </div>
                ))}</div>

>>>>>>> bc5ad071e5171e2c5407e423e7031ff68222db69
            <div className="col-6">
                <h1 className="textbox profile-header">Groups</h1>
                <p className='text-center mb-5'>Placement text for groups</p>
            </div>
        </div>
     );
}
 
export default ProfileContent;
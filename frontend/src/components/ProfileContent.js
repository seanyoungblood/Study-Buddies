import '../css/ProfilePage.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfileContent = () => {
    return ( 
        <div className="row text-center mt-5">
            <div className="col-6">
                <h1 className="textbox profile-header">Classes</h1>
                <p className='text-center mb-5'> COP4200 - Programming Lang <br />
                    COT4035 - Big Discrete <br />
                    TTYL400 - Knight’s Library <br />
                    SING100 - Intro to Opera Singing</p>
            </div>
            <div className="col-6">
                <h1 className="textbox profile-header">Groups</h1>
                <p className='text-center mb-5'>Placement text for groups</p>
            </div>
        </div>
     );
}
 
export default ProfileContent;
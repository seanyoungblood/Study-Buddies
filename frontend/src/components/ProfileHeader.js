
import "../css/HomePage.css"
import logo from "../images/UCF_Logo_Clean_Horizontal_Alt.jpg"   
// use useNavigate hook to when checking is user is logged in // imported for later
import { useNavigate , Link, useLocation} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../useContext/LoginContext";


const ProfileHeader = () => {

    const [background] = useState(`linear-gradient(rgba(77,87,101,0.7), rgba(4,9,30,0.7))`);
    const [profileHeight] = useState('50vh');
    const [profileMargin] = useState('80%');
    const {currentUser, setCurrentUser} = useContext(AuthContext)

    const hideMenu = () => {
        document.getElementById("navLinks").style.right = "-200px";

    }
    const showMenu = () => {
        document.getElementById("navLinks").style.right = "0px";
    }

    const location = useLocation();
    const [log_reg, setLog_reg] = useState(false);
    useEffect(() => {
        console.log(location)
        if(location.pathname === '/login') setLog_reg(true)
        else setLog_reg(false)
    }, [location])

    return ( <>
        {!log_reg && 
        <section className="header" style={{backgroundImage: background, minHeight: profileHeight  }}>
            <nav>
                {/* need to change A tags with react-router-dom API */}
                <Link to="/"> <img src={logo} alt="" /></Link>
                <div className="nav-links" id="navLinks">
                    <i className="fa fa-times" onClick={ hideMenu }></i>
                    <ul>
                        <li><Link to='/'>HOME</Link></li>
                        <li><Link to='/studygroups'>STUDY GROUPS</Link></li>
                        <li><Link to='/about'>ABOUT</Link></li>
                        <li><Link to='/profile'>{currentUser.firstName !== '' ? currentUser.firstName : "PROFILE"}</Link></li>
                    </ul>
			    </div>
			    <i className="fa fa-bars" onClick={ showMenu }></i>
            </nav>

            <div className="text-box" style={{top: profileMargin}}>

			
            <h1>Rick Leinecker</h1>
            <p className="center">Computer Science B.S.</p>

		    </div>
        </section>
        }
        </>
     );
}
 
export default ProfileHeader;
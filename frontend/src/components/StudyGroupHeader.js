import "../css/StudyPage.css"
import studyBackground from "../images/UCF_12.jpg"
import logo from "../images/UCF_Logo_Clean_Horizontal_Alt.jpg"   
// use useNavigate hook to when checking is user is logged in // imported for later
import { useNavigate , Link} from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../useContext/LoginContext";

const StudyGroupHeader = () => {

    const {currentUser, setCurrentUser} = useContext(AuthContext);

    const [background] = useState(`linear-gradient(rgba(77,87,101,0.7), rgba(4,9,30,0.7)), url(${studyBackground})`);

    const hideMenu = () => {
        document.getElementById("navLinks").style.right = "-200px";

    }
    const showMenu = () => {
        document.getElementById("navLinks").style.right = "0px";
    }

    const profile = "PROFILE"
    return ( 
        <section className="header" style={{backgroundImage: background  }}>
            <nav>
                {/* need to change A tags with react-router-dom API */}
                <Link to="/" > <img src={logo} alt="" /></Link>
                <div className="nav-links" id="navLinks">
                    <i className="fa fa-times" onClick={ hideMenu }></i>
                    <ul>
                        <li><Link to='/'>HOME</Link></li>
                        <li><Link to='/studygroups'>STUDY GROUPS</Link></li>
                        <li><Link to='/about'>ABOUT</Link></li>
                        <li><Link to='/profile'>{currentUser.firstName !== '' ? currentUser.firstName : profile}</Link></li>
                    </ul>
			    </div>
			    <i className="fa fa-bars" onClick={ showMenu }></i>
            </nav>

            <div className="text-box">

			<h1>Find Study Groups</h1>
            <p className="center">We are a dedicated team of professionals with a passion for delivering high-quality services. Our goal is to provide exceptional solutions tailored to meet your unique needs.<br></br><br></br>With years of experience in the industry, we have honed our skills and expertise to ensure that we offer the best value to our clients. Trust us to deliver outstanding results every time.</p>
            <Link to='/login' className="hero-btn">Login or Signup to Start</Link>

		    </div>
        </section>
     );
}
 
export default StudyGroupHeader;
import "../css/HomePage.css"
import homeBackround from "../images/UCF_1.jpg"
import majorBackround from "../images/UCF_9.jpg"
import studyBackground from "../images/UCF_12.jpg"
import aboutBackground from "../images/UCF_10.jpg"
import logo from "../images/UCF_Logo_Clean_Horizontal_Alt.jpg"   
// use useNavigate hook to when checking is user is logged in // imported for later
import { useNavigate , Link} from "react-router-dom";
import { useState } from "react";

const HomeHeader = () => {

    const [background] = useState(`linear-gradient(rgba(77,87,101,0.7), rgba(4,9,30,0.7)), url(${homeBackround})`);

    const hideMenu = () => {
        document.getElementById("navLinks").style.right = "-200px";

    }
    const showMenu = () => {
        document.getElementById("navLinks").style.right = "0px";
    }
    return ( 
        <section className="header" style={{backgroundImage: background  }}>
            <nav>
                {/* need to change A tags with react-router-dom API */}
                <a > <img src={logo} alt="" /></a>
                <div className="nav-links" id="navLinks">
                    <i className="fa fa-times" onClick={ hideMenu }></i>
                    <ul>
                        <li><Link to='/'>HOME</Link></li>
                        <li><Link to='/studygroups'>STUDY GROUPS</Link></li>
                        <li><Link to='/about'>ABOUT</Link></li>
                        <li><Link to='/profile'>PROFILE</Link></li>
                    </ul>
			    </div>
			    <i className="fa fa-bars" onClick={ showMenu }></i>
            </nav>

            <div className="text-box">

			<h1>World's Biggest University</h1>
			<p>Welcome to the UCF Study Buddy, your one-stop destination for all things related to the University of Central Florida. Whether you're a prospective student, a current student, a faculty member, or a staff member, you'll find all the information you need here. From admissions and academic programs to campus resources and student life, we're here to help you succeed at UCF.</p>
			<Link to='/studygroups' className="hero-btn">Find A Study Group Today</Link>

		    </div>
        </section>
     );
}
 
export default HomeHeader;
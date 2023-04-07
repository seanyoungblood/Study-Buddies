import "../css/AboutPage.css"
import aboutBackground from "../images/UCF_10.jpg"
import logo from "../images/UCF_Logo_Clean_Horizontal_Alt.jpg"   
// use useNavigate hook to when checking is user is logged in // imported for later
import { useNavigate , Link} from "react-router-dom";
import { useState } from "react";

const AboutHeader = () => {

    const [background, setBackround] = useState(`linear-gradient(rgba(77,87,101,0.7), rgba(4,9,30,0.7)), url(${aboutBackground})`);

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

			<h1>About Our Team</h1>
			<p>Welcome to our website! We are a team of talented and dedicated individuals who have worked together to bring this project to life. Nick, our project manager, has overseen the development of the website from start to finish, ensuring that everything runs smoothly and efficiently. Alex, Christian, and Adam have developed the frontend of the website using HTML, CSS, and JavaScript, creating an engaging and user-friendly interface that makes it easy to navigate and use. Sean has developed the database using mySQL and Digital Ocean, which stores all of the website's information and ensures that it can be accessed quickly and easily. Finally, Brooke and Tayler have developed the API using PHP and JavaScript, which enables the website to communicate with other applications and services. We are proud of what we have accomplished and are excited to share our work with you.</p>
			<Link to='/studygroups' className="hero-btn">Find A Study Group Today</Link>

		    </div>
        </section>
     );
}
 
export default AboutHeader;
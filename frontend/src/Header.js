
import "./css/index.css"
import homeBackround from "./images/UCF_1.jpg"
import majorBackround from "./images/UCF_9.jpg"
import studyBackground from "./images/UCF_12.jpg"
import aboutBackground from "./images/UCF_10.jpg"
import logo from "./images/UCF_Logo_Clean_Horizontal_Alt.jpg"   
// use useNavigate hook to when checking is user is logged in // imported for later
import { useNavigate , Link} from "react-router-dom";
import { useState } from "react";


const Header = () => {
    const [home, setHome] = useState(true);
    const [majors, setMajors] = useState(false);
    const [studyg, setStudyG] = useState(false);
    const [about, setAbout] = useState(false);
    const [profile, setProfile] = useState(false);

    const [login, setLogin] = useState(false);

    const [background, setBackround] = useState(`linear-gradient(rgba(77,87,101,0.7), rgba(4,9,30,0.7)), url(${homeBackround})`);

    const handleHome = () => {
        setBackround(`linear-gradient(rgba(77,87,101,0.7), rgba(4,9,30,0.7)), url(${homeBackround})`)
        setMajors(false);
        setAbout(false);
        setProfile(false);
        setStudyG(false);
        setHome(true);
    }

    const handleMajors = () => {
        setBackround(`linear-gradient(rgba(77,87,101,0.7), rgba(4,9,30,0.7)), url(${majorBackround})`)
        setAbout(false);
        setProfile(false);
        setStudyG(false);
        setHome(false);
        setMajors(true);
    }

    const handleStudy = () => {
        setBackround(`linear-gradient(rgba(77,87,101,0.7), rgba(4,9,30,0.7)), url(${studyBackground})`)
        setAbout(false);
        setProfile(false);
        setStudyG(true);
        setHome(false);
        setMajors(false);
    }

    const handleAbout = () => {
        setBackround(`linear-gradient(rgba(77,87,101,0.7), rgba(4,9,30,0.7)), url(${aboutBackground})`)
        setAbout(true);
        setProfile(false);
        setStudyG(false);
        setHome(false);
        setMajors(false);
    }

    const handleProfile = () => {
       // setBackround(`linear-gradient(rgba(77,87,101,0.7), rgba(4,9,30,0.7)), url(${aboutBackground})`)
        setAbout(false);
        setProfile(true);
        setStudyG(false);
        setHome(false);
        setMajors(false);
    }

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
                        <li onClick={() =>{handleHome()}}><Link to='/'>HOME</Link></li>
                        <li onClick={() =>{handleMajors()}}><Link to='/majors' href="majors.html">MAJOR</Link></li>
                        <li onClick={() =>{handleStudy()}}><Link to='/studygroups' href="study.html">STUDY GROUPS</Link></li>
                        <li onClick={() =>{handleAbout()}}><Link to='/about' href="about.html">ABOUT</Link></li>
                        <li onClick={() =>{handleProfile()}}><Link to='/profile' href="profile.html">PROFILE</Link></li>
                    </ul>
			    </div>
			    <i className="fa fa-bars" onClick={ showMenu }></i>
            </nav>

            <div className="text-box">

			{home && <><h1>World's Biggest University</h1>
			<p>Welcome to the UCF Study Buddy, your one-stop destination for all things related to the University of Central Florida. Whether you're a prospective student, a current student, a faculty member, or a staff member, you'll find all the information you need here. From admissions and academic programs to campus resources and student life, we're here to help you succeed at UCF.</p>
			<a href="study.html" className="hero-btn">Find A Study Group Today</a>
            </>}

            {majors && <><h1>World Class Education</h1>
			<p>UCF offers over 220 majors and degree programs, spanning a wide range of fields including business, engineering, sciences, education, humanities, arts, and more. Whether you're interested in pursuing a bachelor's, master's, or doctoral degree, UCF has a program to help you achieve your academic and professional goals.</p>
			<a href="" class="hero-btn">Visit Us To Learn More</a>
            </>}

            {studyg && <><h1>Find Study Groups</h1>
            <p className="center">Insert Text Here About How It Works</p>
            <a href="study.html" class="hero-btn">Find A Study Group Today</a>
            </>}

            {about && <> <h1 className="center">About Our Team</h1>
            <p className="center">Welcome to our website! We are a team of talented and dedicated individuals who have worked together to bring this project to life. Nick, our project manager, has overseen the development of the website from start to finish, ensuring that everything runs smoothly and efficiently. Alex, Christian, and Adam have developed the frontend of the website using HTML, CSS, and JavaScript, creating an engaging and user-friendly interface that makes it easy to navigate and use. Sean has developed the database using mySQL and Digital Ocean, which stores all of the website's information and ensures that it can be accessed quickly and easily. Finally, Brooke and Tayler have developed the API using PHP and JavaScript, which enables the website to communicate with other applications and services. We are proud of what we have accomplished and are excited to share our work with you.</p></>}

            {profile && <><h1>TDB</h1></>}

		    </div>
        </section>
     );
}
 
export default Header;
import "../css/index.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
const Cta = () => {

    return ( 

    <section className="cta">
        <h1>In Order To Get The Most Use Out Of Our Site <br></br>Login Or Signup To Become A User Today!</h1>
        <Link to="/login"  className="hero-btn">LOGIN</Link>
        <a href="" className="hero-btn">SIGNUP</a>
    </section>
 );
}
 
export default Cta;
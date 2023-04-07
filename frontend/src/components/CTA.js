import "../css/Footer.css";
import { Link } from "react-router-dom";
import { useContext } from "react";

const CTA = () => {

    return ( 

    <section className="cta">
        <h1>In Order To Get The Most Use Out Of Our Site Login Or Signup To Become A User Today!</h1>
        <Link to="/login" className="hero-btn">LOGIN</Link>
        <Link to="/register" className="hero-btn">SIGNUP</Link>
    </section>
 );
}
 
export default CTA;
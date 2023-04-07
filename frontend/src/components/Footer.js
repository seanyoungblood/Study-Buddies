import "../css/Footer.css"


const HomeFooter = () => {
    
    return ( 
    <section className="footer">
		<h4>About Us</h4>
		<p>Our student-oriented website is designed to help you find study groups on campus and learn more about your school and intended major. We understand that college can be challenging and we believe that finding a supportive community of peers can be instrumental to academic success. That's why we created this platform to make it easier for students to connect with others in their classes, share resources, and learn from each other. Whether you're a freshman exploring your major options or a senior looking for a study group before finals, we're here to help you succeed.</p>

		<div className="icons">
			<i className="fa fa-facebook"></i>
			<i className="fa fa-twitter"></i>
			<i className="fa fa-instagram"></i>
			<i className="fa fa-linkedin"></i>
		</div>

        <p>This MERN stack application was made with VSCode and React.JS</p>

	</section>
     );
}
 
export default HomeFooter;
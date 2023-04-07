import "../css/index.css"

const Offer = () => {
    return ( 
        <section className="capability">
            <h1>What This Webpage Offers</h1>
		    <p>This application has multiple functions. These functions are all designed to help UCF students or faculty learn information about different majors offered at UCF, find different study groups on campus, and learn about their campus and its students. Each of these different functions can be found at the navigation menu at the top of the page or by clicking them here.</p>

            <div className="row">
			<div className="capability-col">
				<h3>MAJOR</h3>
				<p>Find out information about your intended major!<br></br>Read reviews from other students and requirements for that major.</p>
			</div>
			<div className="capability-col">
				<h3>STUDY GROUPS</h3>
				<p>Find a group near you to study!<br></br>You can filter groups by your major in order to find others looking to study like yourself.</p>
			</div>
			<div className="capability-col">
				<h3>ABOUT</h3>
				<p>Find out about our development team!<br></br>You can learn about the team members who put this application together and a little about their individual roles.</p>
            </div>
            </div>


        </section>
);
}
 
export default Offer;
import "../css/HomePage.css"

const HomeCapabilities = () => {
    return ( 
        <section className="capability">
            <h1>What This Webpage Offers</h1>
		    <p>This application has multiple functions. These functions are all designed to help UCF students or faculty learn information about different majors offered at UCF, find different study groups on campus, and learn about their campus and its students. Each of these different functions can be found at the navigation menu at the top of the page or by clicking them here.</p>

            <div className="home-rows">
			<div className="capability-col">
				<h3>LOCATIONS</h3>
				<p>Find out about some of UCF's best study locations!<br></br><br></br>Read below about locations and room availability to find where you and your group can study.</p>
			</div>
			<div className="capability-col">
				<h3>STUDY GROUPS</h3>
				<p>Find a group near you to study!<br></br><br></br>You can filter groups by your major in order to find others looking to study like yourself.</p>
			</div>
			<div className="capability-col">
				<h3>ABOUT</h3>
				<p>Find out about our development team!<br></br><br></br>You can learn about the team members who put this application together and a little about their individual roles.</p>
            </div>
            </div>


        </section>
);
}
 
export default HomeCapabilities;
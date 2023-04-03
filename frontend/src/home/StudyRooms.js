import "../css/index.css";
import jch_img from "../images/John-C-Hitt_Library.jpg"
import rosen_img from "../images/Rosen_Library.jpg"
import ucf_6 from "../images/UCF_6.jpg"
import ucf_7 from "../images/UCF_7.jpg"
import ucf_13 from "../images/UCF_13.jpg"

const StudyRooms = () => {
    return ( 
        <section className="study">
            <h1>Our Campus Study Rooms</h1>
		    <p>Our campus offers multiple locations to study at, some of which you can reserve private study rooms. If you're currently UCF student or faculty member, you can reserve a study room for up to four hours per day. You can reserve a room up to seven days in advance. Click on the library name you would like to study at to reserve a room.</p>

            <div className="row">
			<div className="study-col-1">
				<img src={jch_img}></img>
				<div className="layer">
					<h3><a href="https://ucf.libcal.com/reserve/generalstudyroom" target="_blank">John C. Hitt Library</a></h3>
				</div>
			</div>
			<div className="study-col-1">
				<img src={rosen_img}></img>
				<div className="layer">
					<h3><a href="https://ucf.libcal.com/reserve/rosen" target="_blank">Rosen Library</a></h3>
				</div>
			</div>
		</div>

        <p>For more locations to study, consider the following three locations. Their names are provided to assist in helping you find a place to study.</p>

        <div className="row">
			<div className="study-col">
				<img src={ucf_6}></img>
				<div className="layer">
					<h3>Downtown</h3>
				</div>
			</div>
			<div className="study-col">
				<img src={ucf_7}></img>
				<div className="layer">
					<h3>Curriculum<br></br>Materials<br></br>Center</h3>
				</div>
			</div>
			<div className="study-col">
				<img src={ucf_13}></img>
				<div className="layer">
					<h3>UCF Connect<br></br>Libraries</h3>
				</div>
			</div>
		</div>

        </section>
     );
}
 
export default StudyRooms;
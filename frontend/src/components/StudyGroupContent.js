import { Link, useNavigate } from 'react-router-dom';
import "../css/StudyPage.css";

const Content = () => {
    return ( 
        <section className="group-section">
            <div class="search-bar">
                <input type="text" placeholder="Search"></input>
                <Link class="create-group" to='/group'>Create Group</Link>
            </div>

            <div id="group-info-box">
                <div id="group-name">Group Name Example</div>
                <div class="group-details" className="study-rows">
                    <div id="group-summary">Group Summary<br></br><br></br>Text goes here Text goes here Text goes here Text goes here Text goes here Text goes here Text goes here Text goes here</div>
                    <div id="group-classes">Classes<br></br><br></br>COP 4331<br></br>EEL 3123<br></br>MAC 2112<br></br>PSY 8179</div>
                </div>
                <div id="group-rating">
                    Rating:
                    <span id="star1" class="star active">&#9733;</span>
                    <span id="star2" class="star active">&#9733;</span>
                    <span id="star3" class="star active">&#9733;</span>
                    <span id="star4" class="star">&#9733;</span>
                    <span id="star5" class="star">&#9733;</span>
                    <button class="join-btn">Join</button>
                    <button class="delete-btn">Delete</button>
                </div>
            </div> 

            <div class="pagination-bar">
                {/* <button class="prev-btn">&lt;</button> */}
                <button class="prev-btn">Prev Group</button>
                {/* <div class="page-numbers">
                    <button id="but1">1</button>
                    <button id="but2">2</button>
                    <button id="but3">3</button>
                    <button id="but4">4</button>
                    <button id="but5">5</button>
                </div> */}
                {/* <button class="next-btn">&gt;</button> */}
                <button class="next-btn">Next Group</button>
            </div>
        </section>
     );
}
 
export default Content;
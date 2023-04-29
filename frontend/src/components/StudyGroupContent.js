import { Link, useNavigate } from 'react-router-dom';
import "../css/StudyPage.css";
import { useEffect } from 'react';

useEffect(() => {
    const fetchData = async () => {
        try {
            console.log("Searching for " + text);
            const response = await fetch('https://cop-study-buddy-1000.herokuapp.com/api/searchGroup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ field:'groupName', search: text }),
            });
            var data = JSON.parse(await response.text());
            console.log("Results: " + data.results);
        }
        catch (error) {
            console.error(error);
        }
    };
    fetchData();
}, [text]);

var text;

const Content = () => {
    return ( 
        <section className="group-section">
            <div class="search-bar">
                <input type="text" placeholder="Search..." ></input>
                {/*onInput={useEffect}*/}
                <Link class="create-group-btn" to="/group">Create Group</Link>
            </div>

            <div class="tile-container">
                <div class="tile">
                <div class="tile-header">
                    <div id="group-name">Group Name</div>
                    <div class="header-details">
                        <p id="group-course">Course: Course Name</p>
                        <p id="group-date">Date: MM/DD/YYYY</p>
                        <p id="group-time">Time: HH:MM</p>
                    </div>
                </div>
                <div class="tile-content">
                    <div class="objective">
                        <p>Objective:</p>
                        <p id="group-objective">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam viverra ex et mauris finibus, ac blandit orci rutrum.</p>
                    </div>
                    <div class="members">
                        <p>Members:</p>
                        <ul>
                        <li>Member 1</li>
                        <li>Member 2</li>
                        <li>Member 3</li>
                        <li>Member 4</li>
                        </ul>
                    </div>
                </div>
                <div class="tile-footer">
                    <div id="group-rating">
                        <span>Rating:</span>
                        <span class="star active">&#9733;</span>
                        <span class="star active">&#9733;</span>
                        <span class="star active">&#9733;</span>
                        <span class="star active">&#9733;</span>
                        <span class="star">&#9733;</span>
                    </div>
                    <div>
                        <button class="join-btn">Join Group</button>
                        <button class="review-btn">Leave Review</button>
                    </div>
                </div>
                </div>

                <div class="tile">
                    <div class="tile-header">
                    <div id="group-name">Group Name</div>
                    <div class="header-details">
                        <p id="group-course">Course: Course Name</p>
                        <p id="group-date">Date: MM/DD/YYYY</p>
                        <p id="group-time">Time: HH:MM</p>
                    </div>
                    </div>
                    <div class="tile-content">
                    <div class="objective">
                        <p>Objective:</p>
                        <p id="group-objective">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam viverra ex et mauris finibus, ac blandit orci rutrum.</p>
                    </div>
                    <div class="members">
                        <p>Members:</p>
                        <ul>
                            <li>Member 1</li>
                            <li>Member 2</li>
                            <li>Member 3</li>
                        </ul>
                    </div>
                    </div>
                    <div class="tile-footer">
                    <div id="group-rating">
                        <span>Rating:</span>
                        <span class="star active">&#9733;</span>
                        <span class="star active">&#9733;</span>
                        <span class="star active">&#9733;</span>
                        <span class="star active">&#9733;</span>
                        <span class="star active">&#9733;</span>
                    </div>
                    <div>
                        <button class="join-btn">Join Group</button>
                        <button class="review-btn">Leave Review</button>
                    </div>
                    </div>
                </div>
            </div>

            <div class="pagination">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
                <a href="#">5</a>
            </div>
        </section>
     );
}
 
export default Content;
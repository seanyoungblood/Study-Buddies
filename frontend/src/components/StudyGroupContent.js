import { Link, useNavigate } from 'react-router-dom';
import "../css/StudyPage.css";
import { useEffect, useState } from 'react';
import { AuthContext } from '../useContext/LoginContext';
import { useContext } from 'react'

const Content = () => {

    const {currentUser} = useContext(AuthContext);

    const [query, setQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Searching for " + query);
                const response = await fetch('https://cop-study-buddy-1000.herokuapp.com/api/searchGroup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ field:'groupName', search: query }),
                });
                console.log("Before JSON.parse");
                var data = JSON.parse(await response.query());
                console.log("Results: " + data.results);
            }
            catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [query]);

    return ( 
        <section className="group-section">
            <div className="search-bar">
                <input type="text" placeholder="Search..." onChange={(e) => {setQuery(e.target.value);}} />
                <Link className="create-group-btn" to="/group">Create Group</Link>
            </div>

            {/* <div class="tile-container">
                {data.map((value) => (
                    <div class="tile">
                        <div class="tile-header">
                            <div id="group-name" key={value.groupName}>{value.groupName}</div>
                            <div class="header-details">
                                <p id="group-course" key={value.course}>{value.course}</p>
                                <p id="group-date" key={value.date}>{value.date}</p>
                                <p id="group-time" key={value.time}>{value.time}</p>
                            </div>
                        </div>
                        <div class="tile-content">
                            <div class="objective">
                                <p>Objective:</p>
                                <p id="group-objective" key={value.objective}>{value.objective}</p>
                                <p>Location:</p>
                                <p key={value.location}>{value.location}</p>
                            </div>
                            <div class="members">
                                <p>Members:</p>
                                <ul>
                                    <li key={value.members}>{value.members}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="tile-footer">
                            <div id="group-rating">
                                <span key={value.reviews}>Rating:</span>
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
                ))}
                
            </div> */}

            {/* <div class="pagination">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
                <a href="#">5</a>
            </div> */}
        </section>
     );
}
 
export default Content;
import { Link, useNavigate } from 'react-router-dom';
import "../css/StudyPage.css";
import { useEffect, useState } from 'react';
import { AuthContext } from '../useContext/LoginContext';
import { useContext } from 'react'

const Content = () => {


    var star1;
    var star2;
    var star3;
    var star4;
    var star5;

    function reviewsToRating(rating){

        console.log(rating);

        if (rating = 5){
            star1 = "star active";
            star2 = "star active";
            star3 = "star active";
            star4 = "star active";
            star5 = "star active";
        }
        else if (rating < 5 && rating >= 4){
            star1 = "star active";
            star2 = "star active";
            star3 = "star active";
            star4 = "star active";
            star5 = "star";
        }
        else if (rating < 4 && rating >= 3){
            star1 = "star active";
            star2 = "star active";
            star3 = "star active";
            star4 = "star";
            star5 = "star";
        }
        else if (rating < 3 && rating >= 2){
            star1 = "star active";
            star2 = "star active";
            star3 = "star";
            star4 = "star";
            star5 = "star";
        }
        else if (rating < 2 && rating >= 1){
            star1 = "star active";
            star2 = "star";
            star3 = "star";
            star4 = "star";
            star5 = "star";
        }
        else if (rating == NaN){
            star1 = "star";
            star2 = "star";
            star3 = "star";
            star4 = "star";
            star5 = "star";
        }

        return;
    }

    const {currentUser} = useContext(AuthContext);

    const [query, setQuery] = useState('');

    const [data , setData] = useState({});

    useEffect(() => {

        const app_name = 'cop-study-buddy-1000'
        function buildPath(route){
            if (process.env.NODE_ENV === 'production')
            {
                return 'https://' + app_name +  '.herokuapp.com/' + route;
            }
            else
            {
                return 'http://localhost:3000/' + route;
            }
        }

        const fetchData = async () => {
            var obj = {field : "groupName", search: query };
            var js = JSON.stringify(obj);

            try {
                console.log("Searching for " + query);
                const response = await fetch(buildPath('api/searchGroup'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                
                console.log("Before JSON.parse");
                var res = JSON.parse(await response.text());
                setData(res);
                console.log(res);
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

            <div class="tile-container">
                { data.results?.map((value) => (
                    <div class="tile" key={value._id}>
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
                                <ul>{value.members?.map((m) => (
                                    <li key={m.members}>{m}</li>
                                ))}   
                                </ul>
                            </div>
                        </div>
                        <div class="tile-footer">
                            <div id="group-rating">
                                <span>Rating: </span>
                                <span class={star1} id="star 1">&#9733;</span>
                                <span class={star2} id="star 2">&#9733;</span>
                                <span class={star3} id="star 3">&#9733;</span>
                                <span class={star4} id="star 4">&#9733;</span>
                                <span class={star5} id="star 5" onTimeUpdate={reviewsToRating(value.reviews.reduce((sum, curr) => sum + Number(curr), 0) / value.reviews.length)}>&#9733;</span>
                            </div>
                            <div>
                                <button class="join-btn">Join Group</button>
                                <button class="review-btn">Leave Review</button>
                            </div>
                        </div>
                    </div> 
                ))}
                
            </div>

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
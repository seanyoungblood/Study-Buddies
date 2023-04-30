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

        if (rating == 5){
            star1 = <span class="star active">&#9733;</span>
            star2 = <span class="star active">&#9733;</span>
            star3 = <span class="star active">&#9733;</span>
            star4 = <span class="star active">&#9733;</span>
            star5 = <span class="star active">&#9733;</span>
            // console.log("5 " + rating);
        }
        else if (rating < 5 && rating >= 4){
            star1 = <span class="star active">&#9733;</span>
            star2 = <span class="star active">&#9733;</span>
            star3 = <span class="star active">&#9733;</span>
            star4 = <span class="star active">&#9733;</span>
            star5 = <span class="star">&#9733;</span>
            // console.log("4 " + rating);
        }
        else if (rating < 4 && rating >= 3){
            star1 = <span class="star active">&#9733;</span>
            star2 = <span class="star active">&#9733;</span>
            star3 = <span class="star active">&#9733;</span>
            star4 = <span class="star">&#9733;</span>
            star5 = <span class="star">&#9733;</span>
            // console.log("3 " + rating);
        }
        else if (rating < 3 && rating >= 2){
            star1 = <span class="star active">&#9733;</span>
            star2 = <span class="star active">&#9733;</span>
            star3 = <span class="star">&#9733;</span>
            star4 = <span class="star">&#9733;</span>
            star5 = <span class="star">&#9733;</span>
            // console.log("2 " + rating);
        }
        else if (rating < 2 && rating >= 1){
            star1 = <span class="star active">&#9733;</span>
            star2 = <span class="star">&#9733;</span>
            star3 = <span class="star">&#9733;</span>
            star4 = <span class="star">&#9733;</span>
            star5 = <span class="star">&#9733;</span>
            // console.log("1 " + rating);
        }
        else{
            star1 = <span class="star">&#9733;</span>
            star2 = <span class="star">&#9733;</span>
            star3 = <span class="star">&#9733;</span>
            star4 = <span class="star">&#9733;</span>
            star5 = <span class="star">&#9733;</span>
            // console.log("0 " + rating);
        }

        return;
    };

    // async doJoin(passedName) {
    //     const app_name = 'cop-study-buddy-1000';
    //     function buildPath(route){
    //         if (process.env.NODE_ENV === 'production')
    //         {
    //             return 'https://' + app_name +  '.herokuapp.com/' + route;
    //         }
    //         else
    //         {
    //             return 'http://localhost:5000/' + route;
    //         }
    //     }

    //     event.preventDefault();

    //     var obj = {groupName:passedName.value};
    //     var js = JSON.stringify(obj);
    //     console.log(obj);

    //     try
    //     {    
    //         const response = await fetch(buildPath('api/joinGroup'),
    //         {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

    //         var res = JSON.parse(await response.text());

    //         if(!res._id)
    //         {
    //             setMessage('Please check your submission');
    //         }
    //         else
    //         {
    //             var user = {firstName:res.firstName,lastName:res.lastName,id:res._id, groupsIn:res.groupsIn}
    //             localStorage.setItem('user_data', JSON.stringify(user));

    //             setCurrentUser(res);
    //             console.log(currentUser);
    //             setMessage('Works');
    //             console.log(user);

    //             navigate("/");

    //         }
    //     }
    //     catch(e)
    //     {
    //         alert(e.toString());
    //         return;
    //     }  
    // };



    // doJoin(passedName) (() => {

    //     const app_name = 'cop-study-buddy-1000'
    //     function buildPath(route){
    //         if (process.env.NODE_ENV === 'production')
    //         {
    //             return 'https://' + app_name +  '.herokuapp.com/' + route;
    //         }
    //         else
    //         {
    //             return 'http://localhost:5000/' + route;
    //         }
    //     }

    //     event.preventDefault();

    //     var obj = {groupName:passedName.value};
    //     var js = JSON.stringify(obj);
    //     console.log(obj);

    //     try
    //     {    
    //         const response = await fetch(buildPath('api/joinGroup'),
    //         {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

    //         var res = JSON.parse(await response.text());

    //         if(!res._id)
    //         {
    //             setMessage('Please check your submission');
    //         }
    //         else
    //         {
    //             var user = {firstName:res.firstName,lastName:res.lastName,id:res._id, groupsIn:res.groupsIn}
    //             localStorage.setItem('user_data', JSON.stringify(user));

    //             setCurrentUser(res);
    //             console.log(currentUser);
    //             setMessage('Works');
    //             console.log(user);

    //             navigate("/");

    //         }
    //     }
    //     catch(e)
    //     {
    //         alert(e.toString());
    //         return;
    //     }  
    // });

    const {currentUser} = useContext(AuthContext);

    const [query, setQuery] = useState('');

    const [passedName, setPassedName] = useState('');

    const [data , setData] = useState({});

    useEffect((passedName) => {

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
            var obj = {groupName: passedName};
            var js = JSON.stringify(obj);

            try {
                console.log("groupName" + passedName);
                const response = await fetch(buildPath('api/joinGroup'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${currentUser.token}`}});
                
                // console.log("Before JSON.parse");
                var res = JSON.parse(await response.text());
                setData(res);
                console.log(res);
            }
            catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [passedName]);

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
                // console.log("Searching for " + query);
                const response = await fetch(buildPath('api/searchGroup'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                
                // console.log("Before JSON.parse");
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
                                <span onTimeUpdate={reviewsToRating(value.reviews.reduce((sum, curr) => sum + Number(curr), 0) / value.reviews.length)}>Rating: </span>
                                <span>{star1}</span>
                                <span>{star2}</span>
                                <span>{star3}</span>
                                <span>{star4}</span>
                                <span>{star5}</span>
                                {/* <span class={star2.class} id="star 2">&#9733;</span>
                                <span class={star3.class} id="star 3">&#9733;</span>
                                <span class={star4.class} id="star 4">&#9733;</span>
                                <span class={star5.class} id="star 5">&#9733;</span> */}
                            </div>
                            <div>
                                <button class="join-btn" value={value.groupName} onClick={(e) => {setPassedName(e.target.value);}}>Join Group</button>
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
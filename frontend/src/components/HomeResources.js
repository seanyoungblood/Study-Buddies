import "../css/HomePage.css";
import event_cal_img from "../images/UCF_5.jpg"
import school_map_img from "../images/UCF_14.jpg"

const Resources = () => {
    return ( 
        <section className="resource">
            <h1>Resources For You</h1>
		    <p>Our school has many resourvces that are available online for everyone to access. We have linked the UCF Event Calander and the UCF School Map here so that they are readily available for you. Click on the resource you would like to access to be redirected to them.</p>

            <div className="home-rows">
                <div className="resource-col">
                    <img src={event_cal_img}></img>
                    <div className="b-layer">
                        <h3><a href="https://events.ucf.edu/" target="_blank">UCF Event Calander</a></h3>
                    </div>
                </div>
                <div className="resource-col">
                    <img src={school_map_img}></img>
                    <div className="b-layer">
                        <h3><a href="https://map.ucf.edu/" target="_blank">UCF School Map</a></h3>
                    </div>
                </div>
		    </div>

        </section>
     );
}
 
export default Resources;
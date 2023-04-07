import "../css/index.css";

import RickL from "../images/Richard-Leinecker.jpg"
const Reviews = () => {
    return ( 
        <section className="testimonials">

		<h1>What Our Students Think</h1>
		<p>Generate something using ChatGPT to input here. This should be about this length.</p>

		<div className="row">
			<div className="testimonial-col">
				<img src={RickL}></img>
				<div>
					<p>Generate something using ChatGPT to input here. This will eventually scroll through reviews.</p>
					<h3>Charles Barkely</h3>
					<i className="fa fa-star"></i>
					<i className="fa fa-star"></i>
					<i className="fa fa-star"></i>
					<i className="fa fa-star"></i>
					<i className="fa fa-star-o"></i>
				</div>
			</div>
			<div className="testimonial-col">
				<img src={RickL}></img>
				<div>
					<p>Generate something using ChatGPT to input here. This will eventually scroll through reviews.</p>
					<h3>Charley Waters</h3>
					<i className="fa fa-star"></i>
					<i className="fa fa-star"></i>
					<i className="fa fa-star"></i>
					<i className="fa fa-star"></i>
					<i className="fa fa-star-half-o"></i>
				</div>
			</div>
		</div>

	</section>
     );
}
 
export default Reviews;
import rick from "../images/Richard-Leinecker.jpg"
import '../css/styleAbout.css'

const About = () => {
    return ( 
    <section class="members">

    <h1>Meet The Team</h1>
    <p>Generate something using ChatGPT to input here. This should be about this length.</p>

    <div class="row">
        <div class="members-col">
            <img src={rick} />
            <div>
                <h3>Nick</h3>
                <p>Generate something using ChatGPT to input here. This should be about this length.</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="members-col">
            <img src={rick} />
            <div>
                <h3>Adam</h3>
                <p>Generate something using ChatGPT to input here. This should be about this length.</p>
            </div>
        </div>
        <div class="members-col">
            <img src={rick} />
            <div>
                <h3>Alex</h3>
                <p>Generate something using ChatGPT to input here. This should be about this length.</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="members-col">
            <img src={rick} />
            <div>
                <h3>Christian</h3>
                <p>Generate something using ChatGPT to input here. This should be about this length.</p>
            </div>
        </div>
        <div class="members-col">
            <img src={rick} />
            <div>
                <h3>Sean</h3>
                <p>Generate something using ChatGPT to input here. This should be about this length.</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="members-col">
            <img src={rick} />
            <div>
                <h3>Brooke</h3>
                <p>Generate something using ChatGPT to input here. This should be about this length.</p>
            </div>
        </div>
        <div class="members-col">
            <img src={rick} />
            <div>
                <h3>Tayler</h3>
                <p>Generate something using ChatGPT to input here. This should be about this length.</p>
            </div>
        </div>
    </div>

</section> );
}
 
export default About;
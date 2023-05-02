import "../css/MemePage.css";
import Meme1 from "../images/meme_1.jpeg"
import Meme2 from "../images/meme_2.jpg"
import Meme3 from "../images/meme_3.jpg"
import Meme4 from "../images/meme_4.jpg"
import Meme5 from "../images/meme_5.jpg"
import Meme6 from "../images/meme_6.jpg"
import Meme7 from "../images/meme_7.jpg"
import Meme8 from "../images/meme_8.jpg"
import Meme9 from "../images/meme_9.jpg"
import { Navigate, useNavigate } from 'react-router-dom';

const Meme = () => {

    const navigate = useNavigate();

    return ( 
        <section>
            <div class="meme-image-container">
                <img src={Meme1} alt="Image 1" onClick={() => navigate("/")}></img>
                <img src={Meme2} alt="Image 2" onClick={() => navigate("/")}></img>
                <img src={Meme3} alt="Image 3" onClick={() => navigate("/")}></img>
                <img src={Meme4} alt="Image 4" onClick={() => navigate("/")}></img>
                <img src={Meme9} alt="Image 9" onClick={() => navigate("/")}></img>
                <img src={Meme6} alt="Image 6" onClick={() => navigate("/")}></img>
                <img src={Meme7} alt="Image 7" onClick={() => navigate("/")}></img>
                <img src={Meme8} alt="Image 8" onClick={() => navigate("/")}></img>
                <img src={Meme5} alt="Image 5" onClick={() => navigate("/")}></img>
            </div>
        </section>
        
     );
}
 
export default Meme;
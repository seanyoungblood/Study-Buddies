import '../css/ProfilePage.css'

const ProfileContent = () => {
    return ( 
        <div >
            <h1 className="textbox profile-header mt-5">Bio</h1>
            <p className='text-center mb-5 '>Hello, I am ChatGPT, a language model powered by OpenAI. I can help answer your questions, generate creative ideas, and engage in intelligent conversations. With my advanced natural language processing abilities, I'm capable of understanding complex queries and providing insightful responses. Let's connect and see what we can achieve together!</p>
            <h1 className="textbox profile-header">Classes Taking</h1>
            <p className='text-center mb-5'> COP4200 - Programming Languages <br />
                COT4035 - Big Discrete <br />
                TTYL400 - Knight’s Library <br />
                SING100 - Introduction to Opera Singing</p>

            <h1 className="textbox profile-header">Groups</h1>
            <p className='text-center mb-5'>Placement text for groups</p>
        </div>
     );
}
 
export default ProfileContent;
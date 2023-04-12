import React from 'react';

import Login from '../components/Login';
// import pondBackground from '../images/night-time-reflection-pond.jpg'
import pondBackground from '../images/UCF_11.jpg'

const LoginPage = () =>
{

    const background = `linear-gradient(rgba(77,87,101,0.7), rgba(4,9,30,0.7)), url(${pondBackground})`;

    return(
        <div className='login-wrapper'  style={{backgroundImage: background}}>
            <Login />
        </div>
    );
};

export default LoginPage;
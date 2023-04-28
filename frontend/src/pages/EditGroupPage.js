import React from 'react';

import EditGroup from '../components/EditGroup';
import backgroundImg from '../images/UCF_11.jpg'

const EditGroupPage = () =>
{

    const background = `linear-gradient(rgba(77,87,101,0.7), rgba(4,9,30,0.7)), url(${backgroundImg})`;

    return(
        <div className='login-wrapper'  style={{backgroundImage: background}}>
            <EditGroup />
        </div>
    );
};

export default EditGroupPage;
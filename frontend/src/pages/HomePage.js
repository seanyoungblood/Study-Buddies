import React from 'react';

import HomeHeader from '../components/HomeHeader';
import HomeCapabilities from '../components/HomeCapabilities';
import HomeStudyRooms from '../components/HomeStudyRooms';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const HomePage = () =>
{
    return(
        <div>
            <HomeHeader />
            <HomeCapabilities />
            <HomeStudyRooms />
            <CTA />
            <Footer />
        </div>
    );
}

export default HomePage;
import React from 'react';

import AboutHeader from '../components/AboutHeader';
import AboutContent from '../components/AboutContent';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const AboutPage = () =>
{
    return(
        <div>
            <AboutHeader />
            <AboutContent />
            <CTA />
            <Footer />
        </div>
    );
}

export default AboutPage;
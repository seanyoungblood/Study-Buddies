import React from 'react';

import StudyGroupHeader from '../components/StudyGroupHeader';
import StudyGroupContent from '../components/StudyGroupContent';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const StudyGroupsPage = () =>
{
    return(
        <div>
            <StudyGroupHeader />
            <StudyGroupContent />
            <CTA />
            <Footer />
        </div>
    );
}

export default StudyGroupsPage;
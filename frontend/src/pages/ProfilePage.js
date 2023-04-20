import React from 'react';

import ProfileHeader from '../components/ProfileHeader';
import ProfileButtons from '../components/ProfileButtons';
import ProfileContent from '../components/ProfileContent';
import Footer from '../components/Footer';

const ProfilePage = () =>
{
    return(
        <div>
            <ProfileHeader />
            <ProfileButtons />
            <ProfileContent />
            <Footer />
        </div>
    );
}

export default ProfilePage;
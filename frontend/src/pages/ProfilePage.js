import React from 'react';

import ProfileHeader from '../components/ProfileHeader';
import ProfileContent from '../components/ProfileContent';
import Footer from '../components/Footer';

const ProfilePage = () =>
{
    return(
        <div>
            <ProfileHeader />
            <ProfileContent />
            <Footer />
        </div>
    );
}

export default ProfilePage;
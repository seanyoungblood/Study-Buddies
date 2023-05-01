import React from 'react';

import ProfileHeader from '../components/ProfileHeader';
import ProfileButtons from '../components/ProfileButtons';
import ProfileContent from '../components/ProfileContent';
import ProfileDelete from '../components/ProfileDelete';
import Footer from '../components/Footer';

const ProfilePage = () =>
{
    return(
        <div>
            <ProfileHeader />
            <ProfileButtons />
            <ProfileContent />
            <ProfileDelete />
            <Footer />
        </div>
    );
}

export default ProfilePage;
import React from 'react';
import OwnPosts from '../myProfile/ownPosts';
import ProfileEdit from '../profile-edit';

const Notification = () => {
    return (
        <div>
            <ProfileEdit />
            <OwnPosts />
        </div>
    );
};

export default Notification;
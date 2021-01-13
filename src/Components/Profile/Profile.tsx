import React from 'react';
import styles from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import PostsBlock from './PostsBlock/PostsBlock';

function Profile() {
    return (
        <div className={styles.profileWrapper + ' contentWrapper'}>
            <ProfileInfo />
            <PostsBlock />
        </div>
    )
}


export default Profile;
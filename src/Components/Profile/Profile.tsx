import React from 'react';
import styles from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import PostsBlock from './PostsBlock/PostsBlock';
import {ProfilePropsType} from './ProfileContainer';

function Profile(props: ProfilePropsType) {

    return (
        <div className={styles.profileWrapper + ' contentWrapper'}>
            <ProfileInfo/>
            <PostsBlock posts={props.posts} addPost={props.addPostAC} changeLikes={props.changeLikesAC}/>
        </div>
    )
}


export default Profile;
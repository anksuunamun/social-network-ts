import React from 'react';
import styles from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import PostsBlock from './PostsBlock/PostsBlock';
import {PostsType} from '../../redux-store/Profile-reducer';


type ProfilePropsType = {
    "posts": Array<PostsType>
}

function Profile(props: ProfilePropsType) {
    return (
        <div className={styles.profileWrapper + ' contentWrapper'}>
            <ProfileInfo />
            <PostsBlock posts = {props.posts}/>
        </div>
    )
}


export default Profile;
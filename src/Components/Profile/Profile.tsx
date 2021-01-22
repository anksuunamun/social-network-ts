import React from 'react';
import styles from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import PostsBlock from './PostsBlock/PostsBlock';
import {PostsType} from '../../redux-store/Profile-reducer';


type ProfilePropsType = {
    posts: Array<PostsType>
    addPost: (postText: string | number | readonly string[] | undefined) => void
    changeLikes: (id: string, upOrDown: 'up' | 'down') => void
}

function Profile(props: ProfilePropsType) {

    return (
        <div className={styles.profileWrapper + ' contentWrapper'}>
            <ProfileInfo/>
            <PostsBlock posts={props.posts} addPost={props.addPost} changeLikes={props.changeLikes}/>
        </div>
    )
}


export default Profile;
import React from 'react';
import styles from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import PostsBlock from './PostsBlock/PostsBlock';
import {ProfilePropsType} from './ProfileContainer';
import Preloader from '../Common/Preloader/Preloader';

function Profile(props: ProfilePropsType) {
    return (
        <>
            {props.isFetching
                ? <Preloader/>
                : <div className={styles.profileWrapper + ' contentWrapper'}>
                    <ProfileInfo user={props.user}
                                 setUserPhoto={props.setUserPhoto}
                                 userId={props.id}
                                 userStatus={props.userStatus}/>
                    <PostsBlock posts={props.posts}
                                addPost={props.addPostAC}
                                changeLikes={props.changeLikesAC}/>
                </div>}
        </>
    )
}


export default Profile;
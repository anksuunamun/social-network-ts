import React from 'react';
import styles from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import PostsBlock from './PostsBlock/PostsBlock';
import {ProfilePropsType} from './ProfileContainer';
import Preloader from '../Common/Preloader/Preloader';

const Profile = function (props: ProfilePropsType) {
    return (
        <>
            {props.isFetching
                ? <Preloader/>
                : <div className={styles.profileWrapper + ' contentWrapper'}>
                    <ProfileInfo user={props.user}
                                 setUserPhoto={props.setUserPhoto}
                                 userStatus={props.userStatus}
                                 updateProfilePhotoThunkAC={props.updateProfilePhotoThunkAC}
                                 updateUserStatusThunkAC={props.updateUserStatusThunkAC}
                                 isOwner={props.isOwner}
                    />
                    <PostsBlock posts={props.posts}
                                addPost={props.addPostAC}
                                changeLikes={props.changeLikesAC}/>
                </div>}
        </>
    )
}


export default Profile;
import React from 'react';
import styles from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus/ProfileStatus';
import picture from '../../../Assets/Images/picture.png'
import {UserType} from '../../../redux-store/Profile-reducer';

type ProfileInfoPropsType = {
    user: UserType | null
}

function ProfileInfo(props: ProfileInfoPropsType) {
    return (
        <div className={styles.profileInfoWrapper}>
            <div className={styles.profileInfoImg}>
                <img src={props.user?.photos.large || picture} alt="profilePhoto"/>
            </div>

            <div className={styles.textInfo}>
                <div>{props.user?.fullName || 'Name'}</div>
                <ProfileStatus/>
                <div>{props.user?.contacts.facebook || 'My Facebook'}</div>
                <div>{props.user?.contacts.vk || 'My VK'}</div>
                <div>{props.user?.contacts.website || 'My website'}</div>
            </div>

        </div>
    )
}

export default ProfileInfo
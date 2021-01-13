import React from 'react';
import styles from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus/ProfileStatus';
import picture from '../../../Assets/Images/picture.png'

function ProfileInfo() {
    return (
        <div className={styles.profileInfoWrapper}>
            <div className={styles.profileInfoImg}>
                <img src={picture} alt="picture"/>
            </div>

            <div className={styles.textInfo}>
                <div>Name</div>
                <ProfileStatus/>
                <div>My Facebook: </div>
                <div>My VK: </div>
                <div>My email: </div>
            </div>

        </div>
    )
}

export default ProfileInfo
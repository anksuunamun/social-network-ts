import React from 'react';
import styles from './ProfileStatus.module.css';

type ProfileStatusPropsType = {
    userStatus: string
}

function ProfileStatus(props: ProfileStatusPropsType) {
    return (
        <div className={styles.statusWrapper}>
            {props.userStatus || 'Status'}
        </div>
    )
}

export default ProfileStatus;
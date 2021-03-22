import React, {ChangeEvent, useState} from 'react';
import styles from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus/ProfileStatus';
import picture from '../../../Assets/Images/picture.png'
import {UserType} from '../../../redux-store/Profile-reducer';
import axios from 'axios';
import PurpleButton from '../../Common/PurpleButton/PurpleButton';

type ProfileInfoPropsType = {
    user: UserType | null
    setUserPhoto: (photo: string) => void
    userId: number | null
}

function ProfileInfo(props: ProfileInfoPropsType) {
    const [fileName, setFileName] = useState('Update photo');
    const onPhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
        let file = e.target.files ? e.target.files[0] : '';
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            axios.put(`https://social-network.samuraijs.com/api/1.0/profile/photo`, formData,
                {
                    withCredentials: true,
                    headers: {
                        'API-KEY': '7adf2309-2d93-43e6-88f1-3d5c166ae533',
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                    if (response.data.resultCode === 0) {
                        props.setUserPhoto(response.data.data.photos.small);
                    }
                }
            )
        }
        let newFileName = e.currentTarget.value.slice(12)
        setFileName(newFileName);
    }

    return (
        <div className={styles.profileInfoWrapper}>
            <div className={styles.profilePhoto}>
                <div className={styles.profileInfoImg}>
                    <img src={props.user?.photos.large || picture} alt="profilePhoto"/>
                </div>
                {props.user?.userId === props.userId
                    ? <label htmlFor="upload-profile-photo">
                        <span>{fileName}</span> <PurpleButton text={'upload'} onButtonClick={() => {
                    }} small/>
                        <input type="file" onChange={onPhotoUpload} id={'upload-profile-photo'}/>
                    </label>
                    : ''}
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
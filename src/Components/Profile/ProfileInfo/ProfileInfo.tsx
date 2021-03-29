import React, {ChangeEvent, useState} from 'react';
import styles from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus/ProfileStatus';
import picture from '../../../Assets/Images/picture.png'
import {UserProfileType} from '../../../redux-store/Profile-reducer';
import PurpleButton from '../../Common/PurpleButton/PurpleButton';

type ProfileInfoPropsType = {
    user: UserProfileType | null
    setUserPhoto: (photo: string) => void
    userId: number | null
    userStatus: string
    updateProfilePhotoThunkAC: (formData: any) => void
}

function ProfileInfo(props: ProfileInfoPropsType) {
    const [fileName, setFileName] = useState('Update photo');
    const onPhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
        let file = e.target.files ? e.target.files[0] : '';
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            props.updateProfilePhotoThunkAC(formData);
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
                <ProfileStatus userStatus={props.userStatus}/>
                <div>{props.user?.contacts.facebook || 'My Facebook'}</div>
                <div>{props.user?.contacts.vk || 'My VK'}</div>
                <div>{props.user?.contacts.website || 'My website'}</div>
            </div>

        </div>
    )
}

export default ProfileInfo
import React, {ChangeEvent, useCallback, useState} from 'react';
import styles from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus/ProfileStatus';
import picture from '../../../Assets/Images/picture.png'
import {UserProfileType} from '../../../redux-store/Profile-reducer';
import PurpleButton from '../../Common/PurpleButton/PurpleButton';
import ProfileContacts from './ProfileContacts/ProfileContacts';
import {UpdateProfileRequestType} from '../../../data-access-layer/api';

type ProfileInfoPropsType = {
    user: UserProfileType | null
    setUserPhoto: (photo: string) => void
    userStatus: string
    updateProfilePhotoThunkAC: (formData: any) => void
    updateUserStatusThunkAC: (status: string) => void
    isOwner: boolean
    updateUserProfileTC: (data: UpdateProfileRequestType) => void
}

const ProfileInfo = function (props: ProfileInfoPropsType) {
    const [fileName, setFileName] = useState('Update photo');

    const onPhotoUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let file = e.target.files ? e.target.files[0] : '';
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            props.updateProfilePhotoThunkAC(formData);
        }
        let newFileName = e.currentTarget.value.slice(12)
        setFileName(newFileName);
    }, [props.updateProfilePhotoThunkAC])

    return (
        <div className={styles.profileInfoWrapper}>
            <div className={styles.profilePhoto}>
                <div className={styles.profileInfoImg}>
                    <img src={props.user?.photos.large || picture} alt="profilePhoto"/>
                </div>
                {props.isOwner
                    ? <label htmlFor="upload-profile-photo">
                        <span>{fileName}</span> <PurpleButton text={'upload'} onButtonClick={() => {
                    }} small/>
                        <input type="file" onChange={onPhotoUpload} id={'upload-profile-photo'}/>
                    </label>
                    : ''}
            </div>
            <div className={styles.textInfo}>
                <div>{props.user?.fullName || 'Name'}</div>
                <ProfileStatus userStatus={props.userStatus}
                               updateUserStatusThunkAC={props.updateUserStatusThunkAC}
                               isOwner={props.isOwner}/>
                <ProfileContacts user={props.user}
                                 updateUserProfileTC={props.updateUserProfileTC}/>
            </div>

        </div>
    )
}

export default ProfileInfo
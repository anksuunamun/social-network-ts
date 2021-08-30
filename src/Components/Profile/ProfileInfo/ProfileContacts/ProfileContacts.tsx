import React, {useState} from 'react';
import {UserProfileType} from '../../../../redux-store/Profile-reducer';
import styles from './ProfileContacts.module.css';
import {NavLink} from 'react-router-dom';
import PurpleButton from '../../../Common/PurpleButton/PurpleButton';
import ProfileContactsEditForm, {FormDataType} from './ProfileContactsEditForm';
import {createField, Input} from '../../../Common/FieldControls/FieldControls';
import {UpdateProfileRequestType} from '../../../../data-access-layer/api';

type ProfileContactsPropsType = {
    user: UserProfileType | null
    updateUserProfileTC: (data: UpdateProfileRequestType) => void
}

const ProfileContacts: React.FC<ProfileContactsPropsType> = (props) => {

    const [editMode, setEditMode] = useState(false);

    const onEditModeChangeHandler = () => {
        setEditMode(!editMode);
    }

    const contacts = props.user && props.user.contacts && Object.entries(props.user.contacts).map(([contactKey, value]) => {
        return <Contact key={contactKey}
                        contactName={contactKey}
                        contactValue={value}
                        editMode={editMode}/>
    })

    const formData = {
        contacts: props.user?.contacts,
        aboutMe: props.user?.aboutMe,
        fullName: props.user?.fullName,
        lookingForAJob: props.user?.lookingForAJob,
        lookingForAJobDescription: props.user?.lookingForAJobDescription
    }

    const onUpdateProfileFormSubmit = (data: FormDataType) => {
        console.log(data)
        props.user && props.updateUserProfileTC({...data, userId: String(props.user.userId)})
        setEditMode(false);
    }

    return (
        <div className={styles.contactsWrapper}>
            {!editMode && <PurpleButton text={'Edit'} small onButtonClick={onEditModeChangeHandler}/>}
            {editMode ? <ProfileContactsEditForm user={props.user}
                                                 onSubmit={onUpdateProfileFormSubmit}
                                                 initialValues={formData}
                                                 editMode={editMode}/> : contacts}
        </div>
    )
}

type ContactPropsType = {
    contactName: string
    contactValue: string | null
    editMode: boolean
}

export const Contact: React.FC<ContactPropsType> = (props) => {
    return (
        <div className={styles.contact}>
            {!props.editMode ?
                <><span className={styles.name}>{props.contactName} </span>
                    {props.contactValue ? <NavLink to={props.contactValue}/> : <span>{'not indicated'}</span>}</>
                : <>
                    {createField(Input, `contacts.${props.contactName}`, 'text', [], props.contactName, props.contactName, props.contactName)}
                </>}

        </div>
    )
}


export default ProfileContacts;
import React, {useState} from 'react';
import {UserContactsType} from '../../../../redux-store/Profile-reducer';
import styles from './ProfileContacts.module.css';
import {NavLink} from 'react-router-dom';
import PurpleButton from '../../../Common/PurpleButton/PurpleButton';
import ProfileContactsEditForm from './ProfileContactsEditForm';

type ProfileContactsPropsType = {
    contacts: UserContactsType | null
}

const ProfileContacts: React.FC<ProfileContactsPropsType> = (props) => {

    const [editMode, setEditMode] = useState(false);

    const onEditModeChangeHandler = () => {
        setEditMode(!editMode);
    }

    const contacts = props.contacts && Object.entries(props.contacts).map(([contactKey, value]) => {
        return <Contact key={contactKey}
                        contactName={contactKey}
                        contactValue={value}/>
    })

    return (
        <div className={styles.contactsWrapper}>
            <PurpleButton text={'Edit'} small onButtonClick={onEditModeChangeHandler}/>
            {editMode ? <ProfileContactsEditForm/> : contacts}
        </div>
    )
}

type ContactPropsType = {
    contactName: string
    contactValue: string | null
}

const Contact: React.FC<ContactPropsType> = (props) => {
    return (
        <div className={styles.contact}>
            <span className={styles.name}>{props.contactName} </span>
            {props.contactValue ? <NavLink to={props.contactValue}/> : <span>{'not indicated'}</span>}
        </div>
    )
};

export default ProfileContacts;
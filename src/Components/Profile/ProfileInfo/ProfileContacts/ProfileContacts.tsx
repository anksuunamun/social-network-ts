import React from 'react';
import {UserContactsType} from '../../../../redux-store/Profile-reducer';
import styles from './ProfileContacts.module.css';
import {NavLink} from 'react-router-dom';

type ProfileContactsPropsType = {
    contacts: UserContactsType | null
}

const ProfileContacts: React.FC<ProfileContactsPropsType> = (props) => {
    return (
        <div className={styles.contactsWrapper}>
            {props.contacts && Object.entries(props.contacts).map(([contactKey, value]) => {
                return <Contact key={contactKey}
                                contactName={contactKey}
                                contactValue={value}/>
            })}
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
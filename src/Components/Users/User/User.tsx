import React from 'react';
import styles from './User.module.css';
import {NavLink} from 'react-router-dom';
import picture from '../../../Assets/Images/picture.png';
import PurpleButton from '../../Common/PurpleButton/PurpleButton';
import {UserType} from '../../../redux-store/Users-reducer';

type UserPropsType = {
    user: UserType
    onFollow: (userId: number) => void
    onUnfollow: (userId: number) => void
    disabledButtons: number[]
}

const User: React.FC<UserPropsType> = (props) => {
    const {user, onFollow, onUnfollow,} = props
    return (
        <div className={styles.userWrapper} key={user.id}>
            <NavLink to={'/profile/' + user.id}>
                <img src={user.photos.small ? user.photos.small : picture} alt={''}/>
            </NavLink>
            <div className={styles.userName}>{user.name}</div>
            <div>{user.status}</div>
            <div>{user.followed}</div>
            {user.followed
                ? <PurpleButton text={'unfollow'}
                                onButtonClick={() => props.onUnfollow(user.id)}
                                disabled={props.disabledButtons.some(id => id === user.id)}/>
                : <PurpleButton text={'follow'}
                                onButtonClick={() => props.onFollow(user.id)}
                                disabled={props.disabledButtons.some(id => id === user.id)}/>}
        </div>
    )
}

export default User;
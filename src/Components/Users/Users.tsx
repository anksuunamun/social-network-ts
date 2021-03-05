import React from 'react';
import styles from './Users.module.css';
import {UsersPropsType} from './UsersContainer';
import picture from '../../Assets/Images/picture.png'
import PurpleButton from '../Common/PurpleButton/PurpleButton';

function Users(props: UsersPropsType) {
    return (
        <div className={styles.usersWrapper + ' contentWrapper'}>
            {props.users.map(user => {
                const onFollowHandler = () => {
                    props.followUser(user.id)
                }
                const onUnFollowHandler = () => {
                    props.unfollowUser(user.id)
                }
                return <div className={styles.userWrapper} key={user.id}>
                    <img src={user.photos.small ? user.photos.small : picture} alt={''}/>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                    <div>{user.followed}</div>
                    {user.followed
                        ? <PurpleButton text={'unfollow'} onButtonClick={onUnFollowHandler}/>
                        : <PurpleButton text={'follow'} onButtonClick={onFollowHandler}/>}
                </div>
            })}
        </div>
    )
}

export default Users;
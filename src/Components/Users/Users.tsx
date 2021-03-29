import React from 'react';
import styles from './Users.module.css';
import {UsersPropsType} from './UsersContainer';
import picture from '../../Assets/Images/picture.png'
import PurpleButton from '../Common/PurpleButton/PurpleButton';
import Paginator from '../Common/Paginator/Paginator';
import Preloader from '../Common/Preloader/Preloader';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import {followAPI} from '../../data-access-layer/api';

function Users(props: UsersPropsType) {
    const onFollowHandler = (userId: number) => {
        props.setDisabledButton(userId, true);
        followAPI.follow(userId).then(response => {
            if (response.resultCode === 0) {
                props.followUser(userId);
            }
            props.setDisabledButton(userId, false);
        })

    }
    const onUnFollowHandler = (userId: number) => {
        props.setDisabledButton(userId, true);
        followAPI.unfollow(userId).then(
            response => {
                if (response.resultCode === 0) {
                    props.unfollowUser(userId);
                }
                props.setDisabledButton(userId, false);
            }
        )
    }
    const users = props.users.map(user => {
        return <div className={styles.userWrapper} key={user.id}>
            <NavLink to={'/profile/' + user.id}>
                <img src={user.photos.small ? user.photos.small : picture} alt={''}/>
            </NavLink>
            <div className={styles.userName}>{user.name}</div>
            <div>{user.status}</div>
            <div>{user.followed}</div>
            {user.followed
                ? <PurpleButton text={'unfollow'}
                                onButtonClick={() => onUnFollowHandler(user.id)}
                                disabled={props.disabledButtons.some(id => id === user.id)}/>
                : <PurpleButton text={'follow'}
                                onButtonClick={() => onFollowHandler(user.id)}
                                disabled={props.disabledButtons.some(id => id === user.id)}/>}
        </div>
    })

    return (
        <>
            <div className={styles.usersWrapper + ' contentWrapper'}>
                <Paginator totalCount={props.totalCount}
                           currentPage={props.currentPage}
                           portionSize={props.portionSize}
                           pagesPortionSize={10}
                           onPageClickHandler={props.onPageClickHandler}
                           className={styles.paginator}
                />

                {props.isLoading
                    ? <Preloader/>
                    : <div className={styles.usersBlockWrapper}>{users}</div>
                }
            </div>
        </>
    )
}

export default Users;
import React from 'react';
import styles from './Users.module.css';
import {UsersPropsType} from './UsersContainer';
import picture from '../../Assets/Images/picture.png'
import PurpleButton from '../Common/PurpleButton/PurpleButton';
import Paginator from '../Common/Paginator/Paginator';
import Preloader from '../Common/Preloader/Preloader';
import {NavLink} from 'react-router-dom';
import User from './User/User';


function Users(props: UsersPropsType) {

    const users = props.users.map(user => {
        return <User user={user}
                     onFollow={props.onFollow}
                     onUnfollow={props.onFollow}
                     disabledButtons={props.disabledButtons}/>
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
import React from 'react';
import styles from './Users.module.css';
import {UsersPropsType} from './UsersContainer';
import Paginator from '../Common/Paginator/Paginator';
import Preloader from '../Common/Preloader/Preloader';
import User from './User/User';
import UsersSearchForm from './UsersSearchForm/UsersSearchForm';

function Users(props: UsersPropsType) {

    const users = props.users.map(user => {
        return <User user={user}
                     onFollow={props.onFollow}
                     onUnfollow={props.onUnfollow}
                     disabledButtons={props.disabledButtons}
                     key={user.id}/>
    })
    return (
        <>
            <div className={styles.usersWrapper + ' contentWrapper'}>
                <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
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
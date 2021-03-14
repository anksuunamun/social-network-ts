import React from 'react';
import styles from './Users.module.css';
import {UsersPropsType} from './UsersContainer';
import picture from '../../Assets/Images/picture.png'
import PurpleButton from '../Common/PurpleButton/PurpleButton';
import Paginator from '../Common/Paginator/Paginator';
import Preloader from '../Common/Preloader/Preloader';

function Users(props: UsersPropsType) {

    return (
        <>
            <div className={styles.usersWrapper + ' contentWrapper'}>
                <Paginator totalCount={props.totalCount}
                           currentPage={props.currentPage}
                           portionSize={props.portionSize}
                           pagesPortionSize={10}
                           onPageClickHandler={props.onPageClickHandler}/>

                {props.isLoading
                    ? <Preloader/>
                    : props.users.map(user => {
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
        </>
    )
}

export default Users;
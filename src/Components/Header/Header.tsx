import React from 'react';
import styles from './Header.module.css';
import socialLogo from '../../Assets/Images/socialLogo.png'
import {NavLink} from 'react-router-dom';
import PurpleButton from '../Common/PurpleButton/PurpleButton';
import {HeaderPropsType} from './HeaderContainer';
import Preloader from '../Common/Preloader/Preloader';

function Header(props: HeaderPropsType) {
    return (
        <div className={styles.headerWrapper}>
            <div className={styles.logo}>
                <img src={socialLogo} alt=""/>
            </div>
            <div className={styles.userActionsWrapper}>
                {props.isFetching
                    ? <Preloader/>
                    : <div className={styles.userName}>{props.login ? props.login : 'UserName'}</div>
                }
                {<PurpleButton text={'Log out'} onButtonClick={() => console.log('Log out')}/>
                || <NavLink to={'/login'}
                            className={styles.authButtonWrapper}>Log in</NavLink>}
            </div>
        </div>
    )
}

export default Header;
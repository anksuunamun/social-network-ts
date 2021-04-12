import React from 'react';
import styles from './Header.module.css';
import socialLogo from '../../Assets/Images/socialLogo.png'
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
                {props.isAuth ? <PurpleButton text={'Log out'} onButtonClick={() => props.logOutThunk()}/>
                    : <PurpleButton text={'Log in'} navLink={'/login'}>
                    </PurpleButton>}
            </div>
        </div>
    )
}

export default Header;
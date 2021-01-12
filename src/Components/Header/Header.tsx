import React from 'react';
import styles from './Header.module.css';
import socialLogo from '../../Assets/Images/socialLogo.png'
import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <div className={styles.headerWrapper}>
            <div className={styles.logo}>
                <img src={socialLogo} alt=""/>
            </div>
            <div className={styles.userActionsWrapper}>
                <div className={styles.userName}>UserName</div>
                {<button className={styles.authButtonWrapper}>Log out</button> || <NavLink to={'/login'} className={styles.authButtonWrapper}>Log in</NavLink>}
            </div>
        </div>
    )
}

export default Header;
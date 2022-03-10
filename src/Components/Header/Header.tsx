import React from 'react';
import styles from './Header.module.css';
import socialLogo from '../../Assets/Images/socialLogo.png';
import PurpleButton from '../Common/PurpleButton/PurpleButton';
import { HeaderPropsType } from './HeaderContainer';
import Preloader from '../Common/Preloader/Preloader';

const Header = React.memo(function (props: HeaderPropsType) {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.logo}>
        <img src={socialLogo} alt="socialLogo" />
      </div>
      <div className={styles.userActionsWrapper}>
        {props.isFetching ? (
          <Preloader small />
        ) : (
          <div className={styles.userName}>{props.login ? props.login : 'not authorized'}</div>
        )}
        {props.isAuth ? (
          <PurpleButton text={'Log out'} onButtonClick={() => props.logOutThunk()} />
        ) : (
          <PurpleButton text={'Log in'} navLink={'/login'}></PurpleButton>
        )}
      </div>
    </div>
  );
});

Header.displayName = 'Header';

export default Header;

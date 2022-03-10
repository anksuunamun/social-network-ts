import React from 'react';
import styles from './User.module.css';
import { NavLink } from 'react-router-dom';
import picture from '../../../Assets/Images/picture.png';
import PurpleButton from '../../Common/PurpleButton/PurpleButton';
import { UserType } from '../../../redux-store/Users-reducer';

type UserPropsType = {
  user: UserType;
  onFollow: (userId: number) => void;
  onUnfollow: (userId: number) => void;
  disabledButtons: number[];
};

const User = React.memo(function (props: UserPropsType) {
  const {
    user: { id, photos, followed, status, name },
    onFollow,
    onUnfollow,
    disabledButtons,
  } = props;
  return (
    <div className={styles.userWrapper}>
      <NavLink to={'/profile/' + id}>
        <img src={photos.small ? photos.small : picture} alt={''} />
      </NavLink>
      <div className={styles.userName}>{name}</div>
      <div>{status}</div>
      <div>{followed}</div>
      {followed ? (
        <PurpleButton
          text={'unfollow'}
          onButtonClick={() => onUnfollow(id)}
          disabled={disabledButtons.some((itemId) => itemId === id)}
        />
      ) : (
        <PurpleButton
          text={'follow'}
          onButtonClick={() => onFollow(id)}
          disabled={disabledButtons.some((itemId) => itemId === id)}
        />
      )}
    </div>
  );
});

User.displayName = 'User';

export default User;

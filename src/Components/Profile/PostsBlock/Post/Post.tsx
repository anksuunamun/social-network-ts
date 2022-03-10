import React from 'react';
import styles from './Post.module.css';
import userIcon from '../../../../Assets/Images/user-profile.png';

type PostPropsType = {
  text: string;
  likes: string;
  id: string;
  changeLikes: (id: string, upOrDown: 'up' | 'down') => void;
};

function Post(props: PostPropsType) {
  const onArrowClick = (upOrDown: 'up' | 'down') => {
    props.changeLikes(props.id, upOrDown);
  };

  return (
    <div className={styles.post}>
      <img className={styles.userImg} src={userIcon} alt="userIcon" />
      <div className={styles.arrowsWrapper}>
        <svg viewBox="0 0 100 100" className={styles.upTriangle} onClick={() => onArrowClick('up')}>
          <polygon points="50 55, 100 100, 0 100" fill="white" stroke="white" />
        </svg>
        <svg
          viewBox="0 0 100 100"
          className={styles.downTriangle}
          onClick={() => onArrowClick('down')}
        >
          <polygon points="50 55, 100 100, 0 100" fill="white" stroke="white" />
        </svg>
      </div>
      <div className={styles.postWrapper}>
        <div className={styles.postText}>{props.text}</div>
        <div>{props.likes} likes</div>
      </div>
    </div>
  );
}

export default Post;

import React from 'react';
import styles from './Post.module.css';
import userIcon from '../../../../Assets/Images/user-profile.png'


function Post() {
    return (
        <div className={styles.post}>
            <img className={styles.userImg} src={userIcon} alt="userIcon"/>
            <div>
                <div>This is the post text</div>
                <div>Likes</div>
            </div>
        </div>
    )
}


export default Post;
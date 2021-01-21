import React from 'react';
import styles from './Post.module.css';
import userIcon from '../../../../Assets/Images/user-profile.png'

type PostPropsType = {
    text: string
    likes: string
    id: string
}
function Post(props: PostPropsType) {

    return (
        <div className={styles.post}>
            <img className={styles.userImg} src={userIcon} alt="userIcon"/>
            <div>
                <div>{props.text}</div>
                <div>{props.likes}</div>
            </div>
        </div>
    )
}


export default Post;
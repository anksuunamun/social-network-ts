import React from 'react';
import styles from './PostsBlock.module.css'
import Post from './Post/Post';


function PostsBlock() {
    return (
        <div className={styles.postsBlock}>
            <div>
                <p>My posts</p>
                <textarea name="newPost" id="newPost" cols={30} rows={5} placeholder={'Write something here...'} defaultValue={"Write something here..."}></textarea>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={styles.posts}>
                <Post/>
                <Post/>
                <Post/>
            </div>
        </div>
    )
}

export default PostsBlock;
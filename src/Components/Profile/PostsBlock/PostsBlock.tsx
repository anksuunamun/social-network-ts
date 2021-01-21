import React from 'react';
import styles from './PostsBlock.module.css'
import Post from './Post/Post';
import {PostsType} from '../../../redux-store/Profile-reducer';


type PostsBlockType = {
    posts: Array<PostsType>
}

function PostsBlock(props:PostsBlockType) {
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
                {props.posts.map(
                    post => <Post {...post}/>
                )}
            </div>
        </div>
    )
}

export default PostsBlock;
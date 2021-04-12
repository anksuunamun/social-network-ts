import React from 'react';
import styles from './PostsBlock.module.css'
import Post from './Post/Post';
import {PostsType} from '../../../redux-store/Profile-reducer';
import PurpleButton from '../../Common/PurpleButton/PurpleButton';
import {InjectedFormProps, reduxForm, Field} from 'redux-form';
import {TextArea} from '../../Common/FieldControls/FieldControls';


type OwnAddPostFormPropsType = {
    newPostText: string
}


let AddPostForm: React.FC<InjectedFormProps<OwnAddPostFormPropsType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name={'newPostText'}
                   component={TextArea}/>
            <PurpleButton text={'add post'}/>
        </form>

    )
}

const AddPostReduxForm = reduxForm<OwnAddPostFormPropsType>({form: 'addPostForm'})(AddPostForm)

type PostsBlockType = {
    posts: Array<PostsType>
    addPost: (text: string) => void
    changeLikes: (id: string, upOrDown: 'up' | 'down') => void
}

function PostsBlock(props: PostsBlockType) {

    const onFormSubmit = (data: OwnAddPostFormPropsType) => {
        console.log(data)
        props.addPost(data.newPostText);
    }

    return (
        <div className={styles.postsBlock}>
            <div>
                <p>My posts</p>
                <AddPostReduxForm onSubmit={onFormSubmit}/>
            </div>
            <div className={styles.posts}>
                {props.posts.map(
                    post => <Post {...post} key={post.id} changeLikes={props.changeLikes}/>
                )}
            </div>
        </div>
    )
}


export default PostsBlock;
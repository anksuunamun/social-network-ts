import React, {ChangeEvent, useState} from 'react';
import styles from './PostsBlock.module.css'
import Post from './Post/Post';
import {PostsType} from '../../../redux-store/Profile-reducer';
import PurpleButton from '../../Common/PurpleButton/PurpleButton';
import CustomTextarea from '../../Common/CustomTextarea/CustomTextarea';
import {InjectedFormProps, reduxForm, Field} from 'redux-form';


type OwnAddPostFormPropsType = {
    newPostText: string
}
let AddPostForm: React.FC<InjectedFormProps<OwnAddPostFormPropsType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name={'newPostText'}
                   component={'textarea'}/>
            <button>submit</button>
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

    const [newPostText, setNewPostText] = useState<string>('')

    const onclickHandler = () => {
        props.addPost(newPostText)
        setNewPostText('')
    }

    const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setNewPostText(event.target.value)
    }

    return (
        <div className={styles.postsBlock}>
            <div>
                <p>My posts</p>
                <CustomTextarea name={'newPost'}
                                id={'newPost'}
                                value={newPostText}
                                onChange={onChangeHandler}/>
                <AddPostReduxForm onSubmit={(data) => {
                    console.log(data)
                }}/>
                <div>
                    <PurpleButton text={'Add post'} onButtonClick={onclickHandler}/>
                </div>
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
import React, { useCallback } from 'react';
import styles from './PostsBlock.module.css';
import Post from './Post/Post';
import { PostsType } from '../../../redux-store/Profile-reducer';
import PurpleButton from '../../Common/PurpleButton/PurpleButton';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { createField, TextArea } from '../../Common/FieldControls/FieldControls';

type OwnAddPostFormPropsType = {
  newPostText: string;
};

const AddPostForm = React.memo(function (props: InjectedFormProps<OwnAddPostFormPropsType>) {
  return (
    <form onSubmit={props.handleSubmit}>
      {createField(TextArea, 'newPostText')}
      <PurpleButton text={'add post'} type={'submit'} />
    </form>
  );
});

AddPostForm.displayName = 'AddPostForm';

const AddPostReduxForm = React.memo(
  reduxForm<OwnAddPostFormPropsType>({ form: 'addPostForm' })(AddPostForm),
);

type PostsBlockType = {
  posts: Array<PostsType>;
  addPost: (text: string) => void;
  changeLikes: (id: string, upOrDown: 'up' | 'down') => void;
};

const PostsBlock = React.memo(function (props: PostsBlockType) {
  const onFormSubmit = useCallback(
    (data: OwnAddPostFormPropsType) => {
      props.addPost(data.newPostText);
    },
    [props.addPost],
  );

  return (
    <div className={styles.postsBlock}>
      <div>
        <p>My posts</p>
        <AddPostReduxForm onSubmit={onFormSubmit} />
      </div>
      <div className={styles.posts}>
        {props.posts.map((post) => (
          <Post {...post} key={post.id} changeLikes={props.changeLikes} />
        ))}
      </div>
    </div>
  );
});

PostsBlock.displayName = 'PostsBlock';

export default PostsBlock;

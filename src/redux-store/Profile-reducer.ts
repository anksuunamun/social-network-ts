import {v1} from 'uuid';

const ADD_POST = 'ADD_POST';
const CHANGE_LIKES = 'CHANGE_LIKE';


export const addPostAC = (postText: string): AddPostActionType => {
    return {
        type: ADD_POST,
        postText
    }
}

export const changeLikesAC = (id: string, upOrDown: 'up' | 'down'): ChangeLikesActionType => {
    return {
        type: CHANGE_LIKES,
        id,
        upOrDown,
    }
}

export type AddPostActionType = {
    type: typeof ADD_POST
    postText: string
}
export type ChangeLikesActionType = {
    type: typeof CHANGE_LIKES
    id: string
    upOrDown: 'up' | 'down'
}

type ActionsType = AddPostActionType | ChangeLikesActionType


export type ProfileReducerStateType = {
    posts: Array<PostsType>
}

export type PostsType = {
    text: string
    likes: string
    id: string
}

const initialState: ProfileReducerStateType = {
    'posts': [{
        'text': 'This is my first post!',
        'likes': '23',
        'id': v1(),
    },
        {
            'text': 'This is my second post!',
            'likes': '6',
            'id': v1(),
        },
        {
            'text': 'This is my third post!',
            'likes': '901',
            'id': v1(),
        },
        {
            'text': ' I like writing posts!!',
            'likes': '0',
            'id': v1(),
        }
    ],
}


export const profileReducer = (state: ProfileReducerStateType = initialState, action: ActionsType): ProfileReducerStateType => {
    switch (action.type) {
        case (ADD_POST): {
            let newState = {...state, posts: [...state.posts]};
            let newPost: PostsType = {
                text: action.postText,
                likes: '10',
                id: v1()
            }
            newState.posts.push(newPost)
            return newState;
        }
        case (CHANGE_LIKES) : {
            let newState = {...state, posts: [...state.posts]};
            newState.posts.map(post => {
                if (post.id === action.id) {
                    if (action.upOrDown === 'up') {
                        post.likes = String(+post.likes + 1);
                    } else if (action.upOrDown === 'down') {
                        post.likes = String(+post.likes - 1);
                    }
                }
                return post;
            })

            return newState;
        }
        default: {
            return state;
        }
    }

}
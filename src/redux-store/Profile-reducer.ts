import {v1} from 'uuid';

const ADD_POST = 'ADD_POST';


export const addPostAC = (postText: string | number | readonly string[] | undefined) => {
    return {
        type: ADD_POST,
        postText
    }
}

type AddPostACType = {
    type: string
    postText: string
}

type ActionsType = AddPostACType


export type ProfileReducerStateType = {
    posts: Array<PostsType>
}

export type PostsType = {
    text: string
    likes: string
    id: string
}

const initialState = {
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


export const profileReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case (ADD_POST): {
            let newState = {...state};
            let newPost: PostsType = {
                text: action.postText,
                likes: '10',
                id: v1()
            }
            newState.posts.push(newPost)
            console.log(newState)
            return newState;
        }
        default: {
            return state;
        }
    }

}
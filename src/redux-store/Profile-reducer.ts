import {v1} from 'uuid';

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


export const profileReducer = (state = initialState) => {
    return state;
}
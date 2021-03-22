import {v1} from 'uuid';

const ADD_POST = 'ADD_POST';
const CHANGE_LIKES = 'CHANGE_LIKE';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_USER_PHOTOS = 'SET_USER_PHOTOS';


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
export const setProfileAC = (payload: UserType): SetUserProfileActionType => {
    return {
        type: SET_USER_PROFILE,
        payload
    }
}
export const setIsFetchingAC = (isFetching: boolean): SetIsFetchingActionType => {
    return {
        type: SET_IS_FETCHING, isFetching
    }
}
export const setUserPhotoAC = (photo: string): SetUserPhotosActionType => {
    return {
        type: SET_USER_PHOTOS,
        photo
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
export type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    payload: UserType
}
type SetIsFetchingActionType = {
    type: typeof SET_IS_FETCHING
    isFetching: boolean
}
type SetUserPhotosActionType = {
    type: typeof SET_USER_PHOTOS,
    photo: string
}

type ActionsType = AddPostActionType
    | ChangeLikesActionType
    | SetUserProfileActionType
    | SetIsFetchingActionType
    | SetUserPhotosActionType

export type UserType = {
    aboutMe: string | null
    contacts: {
        facebook: string | null
        github: string | null
        instagram: string | null
        mainLink: string | null
        twitter: string | null
        vk: string | null
        website: string | null
        youtube: string | null
    }
    fullName: string | null
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    photos: {
        large: string | null
        small: string | null
    }
    userId: number
}

export type ProfileReducerStateType = {
    posts: Array<PostsType>
    user: null | UserType
    isFetching: boolean
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
    user: null,
    isFetching: true
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
        case (SET_USER_PROFILE): {
            return {
                ...state,
                user: {...action.payload},
            }
        }
        case (SET_IS_FETCHING): {
            return {...state, isFetching: action.isFetching}
        }
        case (SET_USER_PHOTOS) : {
            let updatedUser = {
                ...state.user, photos: {
                    small: action.photo,
                    large: action.photo
                }
            } as UserType
            return {
                ...state, user: updatedUser
            }
        }
        default: {
            return state;
        }
    }

}
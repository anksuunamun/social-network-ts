import {v1} from 'uuid';
import {profileAPI, UpdateProfileRequestType} from '../data-access-layer/api';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AppStateType} from './redux-store';

const ADD_POST = 'ADD_POST';
const CHANGE_LIKES = 'CHANGE_LIKE';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_USER_PHOTOS = 'SET_USER_PHOTOS';
const SET_USER_STATUS = 'SET_USER_STATUS';


export const addPostAC = (postText: string): AddPostActionType => {
    return {
        type: ADD_POST,
        postText
    }
}
export type AddPostActionType = {
    type: typeof ADD_POST
    postText: string
}

export const changeLikesAC = (id: string, upOrDown: 'up' | 'down'): ChangeLikesActionType => {
    return {
        type: CHANGE_LIKES,
        id,
        upOrDown,
    }
}

export type ChangeLikesActionType = {
    type: typeof CHANGE_LIKES
    id: string
    upOrDown: 'up' | 'down'
}

export const setProfileAC = (payload: UserProfileType): SetUserProfileActionType => {
    return {
        type: SET_USER_PROFILE,
        payload
    }
}

export type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    payload: UserProfileType
}
export const setIsFetchingAC = (isFetching: boolean): SetIsFetchingActionType => {
    return {
        type: SET_IS_FETCHING, isFetching
    }
}

type SetIsFetchingActionType = {
    type: typeof SET_IS_FETCHING
    isFetching: boolean
}
export const setUserPhotoAC = (photo: string): SetUserPhotosActionType => {
    return {
        type: SET_USER_PHOTOS,
        photo
    }
}

type SetUserPhotosActionType = {
    type: typeof SET_USER_PHOTOS,
    photo: string
}
export const setUserStatusAC = (status: string): SetUserStatusActionType => {
    return {
        type: SET_USER_STATUS,
        status
    }
}

type SetUserStatusActionType = {
    type: typeof SET_USER_STATUS,
    status: string
}
export type ThunkType = ThunkAction<Promise<void> | void, AppStateType, unknown, ActionsType>

export const getUserProfileThunkAC = (userId: number): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>, getState: () => AppStateType) => {
        dispatch(setIsFetchingAC(true));
        profileAPI.getUserProfile(userId)
            .then((response) => {
                dispatch(setProfileAC(response));
                dispatch(setIsFetchingAC(false));
            })
            .catch(response => console.log(response));
    }
}


export const getUserStatusThunkAC = (userId: number): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>, getState: () => AppStateType) => {
        profileAPI.getUserStatus(userId)
            .then(response => dispatch(setUserStatusAC(response)))
            .catch(response => console.log(response));
    }
}

export const updateProfilePhotoThunkAC = (formData: Blob) => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
        profileAPI.updateProfilePhoto(formData)
            .then(response => {
                if (response.resultCode === 0) {
                    dispatch(setUserPhotoAC(response.data.photos.small));
                }
            })
            .catch(response => console.log(response));
    }
}

export const updateUserStatusThunkAC = (status: string): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
        profileAPI.updateUserStatus(status)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setUserStatusAC(status));
                }
            })
    }
}

export const updateUserProfileTC = (data: UpdateProfileRequestType): ThunkType => (dispatch, getState) => {
    profileAPI.updateUserProfile(data)
        .then(response => {
            if (response.resultCode === 0) {
                const userId = getState().auth.id;
                userId && getUserProfileThunkAC(userId);
            }
        })
}

export type ActionsType = AddPostActionType
    | ChangeLikesActionType
    | SetUserProfileActionType
    | SetIsFetchingActionType
    | SetUserPhotosActionType
    | SetUserStatusActionType

export type UserContactsType = {
    facebook: string | null
    github: string | null
    instagram: string | null
    mainLink: string | null
    twitter: string | null
    vk: string | null
    website: string | null
    youtube: string | null
}

export type UserProfileType = {
    aboutMe: string | null
    contacts: UserContactsType
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
    user: null | UserProfileType
    isFetching: boolean
    userStatus: string
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
    isFetching: true,
    userStatus: '',
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
            } as UserProfileType
            return {
                ...state, user: updatedUser
            }
        }
        case (SET_USER_STATUS) : {
            return {...state, userStatus: action.status}
        }
        default: {
            return state;
        }
    }

}
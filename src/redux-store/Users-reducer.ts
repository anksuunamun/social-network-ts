import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AppStateType} from './redux-store';
import {followAPI, usersAPI} from '../data-access-layer/api';

const SET_USERS = 'SET_USERS';
const FOLLOW_USER = 'FOLLOW_USER';
const UNFOLLOW_USER = 'UNFOLLOW_USER';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const SET_IS_LOADING = 'SET_IS_LOADING';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_DISABLED_BUTTON = 'SET_DISABLED_BUTTON';

// enum USERS_REDUCER_ACTIONS_TYPE {
//     SET_USERS = 'SET_USERS',
//     FOLLOW_USER = 'FOLLOW_USER',
//     UNFOLLOW_USER = 'UNFOLLOW_USER',
//     SET_TOTAL_COUNT = 'SET_TOTAL_COUNT',
//     SET_IS_LOADING = 'SET_IS_LOADING',
//     SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
//     SET_DISABLED_BUTTON = 'SET_DISABLED_BUTTON'
// }

export type UserType = {
    followed: boolean
    id: number
    name: string
    photos: {
        small: null | string
        large: null | string
    }
    status: null | string
    uniqueUrlName: null | string
}

export type UsersReducerInitialStateType = {
    users: Array<UserType>
    totalCount: number
    currentPage: number
    portionSize: number
    isLoading: boolean
    disabledButtons: Array<number>
}

const initialState: UsersReducerInitialStateType = {
    users: [],
    totalCount: 0,
    currentPage: 1,
    portionSize: 9,
    isLoading: false,
    disabledButtons: [],
}


type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
type SetTotalCountActionType = {
    type: typeof SET_TOTAL_COUNT
    totalCount: number
}
type SetIsLoadingActionType = {
    type: typeof SET_IS_LOADING
    isLoading: boolean
}
type FollowUserActionType = {
    type: typeof FOLLOW_USER
    id: number
}
type UnFollowUserActionType = {
    type: typeof UNFOLLOW_USER
    id: number
}
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
type SetDisabledButtonActionType = {
    type: typeof SET_DISABLED_BUTTON,
    id: number
    isFetching: boolean
}
export const setUsersAC = (users: Array<UserType>): SetUsersActionType => {
    return {
        type: SET_USERS, users
    }
}
export const setTotalCountAC = (totalCount: number): SetTotalCountActionType => {
    return {
        type: SET_TOTAL_COUNT, totalCount
    }
}
export const setIsLoadingAC = (isLoading: boolean): SetIsLoadingActionType => {
    return {
        type: SET_IS_LOADING, isLoading
    }
}

export const FollowUserAC = (id: number): FollowUserActionType => {
    return {
        type: FOLLOW_USER, id
    }
}

export const UnFollowUserAC = (id: number): UnFollowUserActionType => {
    return {
        type: UNFOLLOW_USER, id
    }
}
export const SetCurrentPageAC = (currentPage: number): SetCurrentPageActionType => {
    return {
        type: SET_CURRENT_PAGE, currentPage
    }
}
export const setDisabledButtonAC = (id: number, isFetching: boolean): SetDisabledButtonActionType => {
    return {
        type: SET_DISABLED_BUTTON,
        id, isFetching
    }
}

// const actions = {
//     setDisabledButtonAC: (id: number, isFetching: boolean): SetDisabledButtonActionType => {
//         return {
//             type: SET_DISABLED_BUTTON,
//             id, isFetching
//         }
//     }
// }

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionType>

export const getUsersThunkAC = (portionSize: number, currentPage: number): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>) => {
        dispatch(setIsLoadingAC(true));
        usersAPI.getUsers(portionSize, currentPage)
            .then(response => {
                dispatch(setUsersAC(response.items));
                dispatch(setTotalCountAC(response.totalCount));
                dispatch(setIsLoadingAC(false));
            })
            .catch(response => console.log(response))
    }
}

export const onPageClickThunkAC = (portionSize: number, currentPage: number): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>) => {
        dispatch(setIsLoadingAC(true));
        dispatch(SetCurrentPageAC(currentPage));
        usersAPI.getUsers(portionSize, currentPage)
            .then(response => {
                dispatch(setUsersAC(response.items));
                dispatch(setIsLoadingAC(false));
            })
            .catch(reason => console.log(reason))
    }
}

export const followThunkAC = (userId: number): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>) => {
        dispatch(setDisabledButtonAC(userId, true));
        followAPI.follow(userId).then(response => {
            if (response.resultCode === 0) {
                dispatch(FollowUserAC(userId))
            }
            dispatch(setDisabledButtonAC(userId, false))
        })
    }
}

export const unfollowThunkAC = (userId: number): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>) => {
        dispatch(setDisabledButtonAC(userId, true));
        followAPI.unfollow(userId).then(
            response => {
                if (response.resultCode === 0) {
                    dispatch(UnFollowUserAC(userId));
                }
                dispatch(setDisabledButtonAC(userId, false))
            }
        )
    }
}


export type ActionType =
    SetUsersActionType
    | FollowUserActionType
    | UnFollowUserActionType
    | SetTotalCountActionType
    | SetIsLoadingActionType
    | SetCurrentPageActionType
    | SetDisabledButtonActionType

export const usersReducer = (state: UsersReducerInitialStateType = initialState, action: ActionType): UsersReducerInitialStateType => {
    switch (action.type) {
        case (SET_USERS): {
            let localState = {...state}
            localState.users = [...action.users]
            return localState
        }
        case (FOLLOW_USER): {
            return {
                ...state, users: state.users.map(user => {
                    if (user.id === action.id) {
                        return {...user, followed: true}
                    } else return user
                })
            }
        }
        case (UNFOLLOW_USER): {
            return {
                ...state, users: state.users.map(user => {
                    if (user.id === action.id) {
                        return {...user, followed: false}
                    } else return user
                })
            }
        }
        case (SET_TOTAL_COUNT): {
            return {...state, totalCount: action.totalCount}
        }
        case (SET_IS_LOADING): {
            return {...state, isLoading: action.isLoading}
        }
        case (SET_CURRENT_PAGE): {
            return {...state, currentPage: action.currentPage}
        }
        case (SET_DISABLED_BUTTON): {
            let ids: Array<number>;
            if (state.disabledButtons.some(id => id === action.id)) {
                ids = state.disabledButtons.filter(id => id !== action.id)
            } else {
                ids = [...state.disabledButtons, action.id]
            }
            return {...state, disabledButtons: ids};
            // return {
            //     ...state,
            //     disabledButtons: action.isFetching
            //         ? [...state.disabledButtons, action.id]
            //         : state.disabledButtons.filter(id => id !== action.id)
            // }
        }
        default:
            return state
    }
}
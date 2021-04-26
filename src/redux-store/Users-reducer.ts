import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AppStateType} from './redux-store';
import {CommonResponseType, followAPI, usersAPI} from '../data-access-layer/api';
import {updateObjectInArray} from '../utils/objectHelpers';

const SET_USERS = 'SET_USERS';
const FOLLOW_USER = 'FOLLOW_USER';
const UNFOLLOW_USER = 'UNFOLLOW_USER';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const SET_IS_LOADING = 'SET_IS_LOADING';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_DISABLED_BUTTON = 'SET_DISABLED_BUTTON';
const SET_SEARCH_FILTER = 'SET_SEARCH_FILTER';

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
    filter: {
        friend: boolean | null,
        term: string
    }
}

export type SearchFilterType = typeof initialState.filter;

const initialState: UsersReducerInitialStateType = {
    users: [],
    totalCount: 0,
    currentPage: 1,
    portionSize: 9,
    isLoading: false,
    disabledButtons: [],
    filter: {
        friend: false,
        term: ''
    }
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
type SetSearchFilterActionType = {
    type: typeof SET_SEARCH_FILTER,
    term: string
    friend: boolean | null
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

export const SetSearchFilterAC = (term: string, friend: boolean | null): SetSearchFilterActionType => {
    return {
        type: SET_SEARCH_FILTER, term, friend
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

export const getUsersThunkAC = (portionSize: number, currentPage: number, term: string = '', friend: boolean | null = null): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>) => {
        dispatch(setIsLoadingAC(true));
        usersAPI.getUsers(portionSize, currentPage, term, friend)
            .then(response => {
                dispatch(setUsersAC(response.items));
                dispatch(setTotalCountAC(response.totalCount));
                dispatch(setIsLoadingAC(false));
                dispatch(SetSearchFilterAC(term, friend));
            })
            .catch(response => console.log(response))
    }
}

export const onPageClickThunkAC = (portionSize: number, currentPage: number, term: string = '', friend: boolean | null = null): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>) => {
        dispatch(setIsLoadingAC(true));
        dispatch(SetCurrentPageAC(currentPage));
        usersAPI.getUsers(portionSize, currentPage, term, friend)
            .then(response => {
                dispatch(setUsersAC(response.items));
                dispatch(setIsLoadingAC(false));
            })
            .catch(reason => console.log(reason))
    }
}

const followUnfollowFlow = (userId: number, dispatch: ThunkDispatch<AppStateType, unknown, ActionType>,
                            actionCreator: (id: number) => FollowUserActionType | UnFollowUserActionType,
                            apiMethod: (userId: number) => Promise<CommonResponseType<{}>>) => {
    dispatch(setDisabledButtonAC(userId, true));
    apiMethod(userId).then(response => {
        if (response.resultCode === 0) {
            dispatch(actionCreator(userId))
        }
        dispatch(setDisabledButtonAC(userId, false))
    })
}

export const followThunkAC = (userId: number): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>) => {
        const apiMethod = followAPI.follow.bind(followAPI);
        followUnfollowFlow(userId, dispatch, FollowUserAC, apiMethod);
    }
}

export const unfollowThunkAC = (userId: number): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionType>) => {
        const apiMethod = followAPI.unfollow.bind(followAPI);
        followUnfollowFlow(userId, dispatch, UnFollowUserAC, apiMethod);

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
    | SetSearchFilterActionType

export const usersReducer = (state: UsersReducerInitialStateType = initialState, action: ActionType): UsersReducerInitialStateType => {
    switch (action.type) {
        case (SET_USERS): {
            let localState = {...state}
            localState.users = [...action.users]
            return localState
        }
        case (FOLLOW_USER): {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.id, 'id', {followed: true})
            }
        }
        case (UNFOLLOW_USER): {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.id, 'id', {followed: false})
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
            //Another variant.
            // return {
            //     ...state,
            //     disabledButtons: action.isFetching
            //         ? [...state.disabledButtons, action.id]
            //         : state.disabledButtons.filter(id => id !== action.id)
            // }
        }
        case (SET_SEARCH_FILTER): {
            return {
                ...state, filter: {
                    friend: action.friend,
                    term: action.term
                }
            }
        }
        default:
            return state
    }
}
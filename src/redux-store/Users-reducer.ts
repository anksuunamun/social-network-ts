const SET_USERS = 'SET_USERS';
const FOLLOW_USER = 'FOLLOW_USER';
const UNFOLLOW_USER = 'UNFOLLOW_USER';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const SET_IS_LOADING = 'SET_IS_LOADING';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

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
}

const initialState: UsersReducerInitialStateType = {
    users: [],
    totalCount: 0,
    currentPage: 1,
    portionSize: 5,
    isLoading: true
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
type ActionType =
    SetUsersActionType
    | FollowUserActionType
    | UnFollowUserActionType
    | SetTotalCountActionType
    | SetIsLoadingActionType
    | SetCurrentPageActionType

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
        default:
            return state
    }
}
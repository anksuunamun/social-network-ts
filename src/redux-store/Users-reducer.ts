const SET_USERS = 'SET_USERS';
const FOLLOW_USER = 'FOLLOW_USER';
const UNFOLLOW_USER = 'UNFOLLOW_USER';

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
}

const initialState: UsersReducerInitialStateType = {
    // users: [{
    //     followed: false,
    //     id: 15527,
    //     name: 'grigory95',
    //     photos:
    //         {
    //             small: null,
    //             large: null
    //         },
    //     status: null,
    //     uniqueUrlName: null,
    // },
    //     {
    //         followed: true,
    //         id: 15521,
    //         name: 'grigory95',
    //         photos:
    //             {
    //                 small: null,
    //                 large: null
    //             },
    //         status: null,
    //         uniqueUrlName: null,
    //     }]
    users: []
}


type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
type FollowUserActionType = {
    type: typeof FOLLOW_USER
    id: number
}
type UnFollowUserActionType = {
    type: typeof UNFOLLOW_USER
    id: number
}
export const setUsersAC = (users: Array<UserType>): SetUsersActionType => {
    return {
        type: SET_USERS, users
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
type ActionType = SetUsersActionType | FollowUserActionType | UnFollowUserActionType

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
        default:
            return state
    }
}
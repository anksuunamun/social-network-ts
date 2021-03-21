const SET_AUTH_USER = 'SET_AUTH_USER';
const SET_IS_FETCHING = 'SET_IS_FETCHING';

const initialState: initialStateType = {
    id: null,
    login: null,
    email: null,
    isFetching: false,
}

type initialStateType = {
    id: number | null
    login: string | null
    email: string | null
    isFetching: boolean
}

type SetUserAuthActionType = {
    type: typeof SET_AUTH_USER
    payload: {
        id: number
        login: string
        email: string
    }
}
type SetIsFetchingActionType = {
    type: typeof SET_IS_FETCHING
    isFetching: boolean
}

export const setUserAuth = (id: number, login: string, email: string): SetUserAuthActionType => {
    return {
        type: SET_AUTH_USER,
        payload: {id, login, email},
    }
}
export const setIsFetching = (isFetching: boolean): SetIsFetchingActionType => {
    return {
        type: SET_IS_FETCHING,
        isFetching
    }
}

type ActionsType = SetUserAuthActionType | SetIsFetchingActionType;

export const authReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case (SET_AUTH_USER): {
            return {...state, ...action.payload};
        }
        case (SET_IS_FETCHING): {
            return {...state, isFetching: action.isFetching}
        }
        default: {
            return state
        }
    }
}
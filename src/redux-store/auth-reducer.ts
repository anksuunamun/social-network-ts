import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AppStateType} from './redux-store';
import {authAPI} from '../data-access-layer/api';

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

type ThunkType = ThunkAction<Promise<void> | void, AppStateType, unknown, ActionsType>

export const getAuthThunkAC = (): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
        dispatch(setIsFetching(true));
        authAPI.getAuth()
            .then(
                response => {
                    if (response.resultCode === 0) {
                        let {id, login, email} = response.data;
                        dispatch(setUserAuth(id, login, email));
                        dispatch(setIsFetching(false));
                    }
                })
            .catch(response => console.log(response));
    }
}

export type ActionsType = SetUserAuthActionType | SetIsFetchingActionType;

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
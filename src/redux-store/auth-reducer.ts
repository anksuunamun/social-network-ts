import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AppStateType} from './redux-store';
import {authAPI} from '../data-access-layer/api';
import {FormAction, stopSubmit} from 'redux-form';

const SET_AUTH_USER = 'SET_AUTH_USER';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_IS_AUTH = 'SET_IS_AUTH';
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL';

const initialState: initialStateType = {
    id: null,
    login: null,
    email: null,
    isFetching: false,
    isAuth: false,
    captchaURL: null
}

type initialStateType = {
    id: number | null
    login: string | null
    email: string | null
    isFetching: boolean
    isAuth: boolean
    captchaURL: string | null
}

type SetUserAuthActionType = {
    type: typeof SET_AUTH_USER
    payload: {
        id: number | null
        login: string | null
        email: string | null
    }
}
type SetIsFetchingActionType = {
    type: typeof SET_IS_FETCHING
    isFetching: boolean
}

export const setUserAuth = (id: number | null, login: string | null, email: string | null): SetUserAuthActionType => {
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

type SetIsAuthActionType = {
    type: typeof SET_IS_AUTH,
    isAuth: boolean
}

export const setIsAuthAC = (isAuth: boolean): SetIsAuthActionType => {
    return {
        type: SET_IS_AUTH,
        isAuth
    }
}

type SetCaptchaUrlAC = {
    type: typeof SET_CAPTCHA_URL,
    url: string
}

export const setCaptchaURLAC = (url: string): SetCaptchaUrlAC => ({type: SET_CAPTCHA_URL, url})

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
                        dispatch(setIsAuthAC(true));
                    } else if (response.resultCode === 1) {
                        dispatch(setIsFetching(false));
                    }
                })
            .catch(response => console.log(response));
    }
}

export const logInThunk = (email: string, password: string, rememberMe: boolean, captcha?: string): ThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType | FormAction>) => {
        authAPI.login(email, password, rememberMe, captcha)
            .then(response => {
                if (response.resultCode === 0) {
                    dispatch(getAuthThunkAC());
                } else if (response.resultCode === 1) {
                    dispatch(stopSubmit('loginForm', {_error: response.messages[0] ? response.messages[0] : 'Some error'}))
                } else if (response.resultCode === 10) {
                    dispatch(getCaptchaTC());
                }
            })
            .catch(error => console.log(error))
    }
}

export const logOutThunk = (): ThunkType => (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType | FormAction>) => {
    authAPI.logout().then(response => {
        if (response.resultCode === 0) {
            dispatch(setUserAuth(null, null, null));
            dispatch(setIsAuthAC(false));
            dispatch(setIsFetching(false));
        } else if (response.resultCode === 1) {
            dispatch(setIsFetching(false));
        }
    })
}

export const getCaptchaTC = (): ThunkType => (dispatch: ThunkDispatch<AppStateType, unknown, ActionsType>) => {
    authAPI.getCaptchaUrl()
        .then(response => {
            dispatch(setCaptchaURLAC(response.url))
        })
}

export type ActionsType = SetUserAuthActionType | SetIsFetchingActionType | SetIsAuthActionType | SetCaptchaUrlAC;

export const authReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case (SET_AUTH_USER): {
            return {...state, ...action.payload};
        }
        case (SET_IS_FETCHING): {
            return {...state, isFetching: action.isFetching}
        }
        case (SET_IS_AUTH) : {
            return {...state, isAuth: action.isAuth}
        }
        case (SET_CAPTCHA_URL): {
            return {...state, captchaURL: action.url}
        }
        default: {
            return state;
        }
    }
}
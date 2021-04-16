import {getAuthThunkAC} from './auth-reducer';
import {ThunkDispatch} from 'redux-thunk';
import {AppStateType} from './redux-store';

const initialState = {
    isAppInitialized: false
}
type AppActionType = ReturnType<typeof setAppInitialized>

export const setAppInitialized = () => ({type: 'SET_APP_INITIALIZED'} as const)

export const setAppInitTC = () => (dispatch: ThunkDispatch<AppStateType, unknown, AppActionType>) => {
    new Promise((res) => {
        dispatch(getAuthThunkAC());
        res('')
    }).then(response => dispatch(setAppInitialized())
    )

}

export const appReducer = (state = initialState, action: AppActionType): typeof initialState => {
    switch (action.type) {
        case 'SET_APP_INITIALIZED':
            return {...state, isAppInitialized: true}
        default:
            return state;
    }
}
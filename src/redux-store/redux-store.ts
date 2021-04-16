import {applyMiddleware, combineReducers, createStore} from 'redux'
import {profileReducer} from './Profile-reducer';
import {dialogsReducer} from './Dialogs-reducer';
import {usersReducer} from './Users-reducer';
import {authReducer} from './auth-reducer';
import thunk from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import {appReducer} from './app-reducer';


//в итоге возвращается один большой rootReducer а не reducers

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppStateType = ReturnType<typeof rootReducer>;

export default store;

//@ts-ignore
window.store = store
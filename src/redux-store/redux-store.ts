import {combineReducers, createStore} from 'redux'
import {profileReducer} from './Profile-reducer';
import {dialogsReducer} from './Dialogs-reduser';

//в итоге возвращается один большой rootReducer а не reducers

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
})

const store = createStore(rootReducer)

export type AppStateType = ReturnType<typeof rootReducer>;

export default store;
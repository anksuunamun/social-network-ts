import {combineReducers, createStore} from 'redux'
import {profileReducer} from './Profile-reducer';
import {dialogsReducer} from './Dialogs-reduser';


let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
})

const store = createStore(reducers)


export default store;
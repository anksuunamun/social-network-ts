import {combineReducers, createStore} from 'redux'
import {profileReducer} from './Profile-reducer';


let reducers = combineReducers({
    profilePage: profileReducer,
})

const store = createStore(reducers)


export default store;
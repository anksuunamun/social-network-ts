import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { profileReducer } from './Profile-reducer';
import { dialogsReducer } from './Dialogs-reducer';
import { usersReducer } from './Users-reducer';
import { authReducer } from './auth-reducer';
import { reducer as formReducer } from 'redux-form';
import createSagaMiddleware from 'redux-saga'
import { appReducer } from './app-reducer';
import rootSaga from "./sagas/rootSaga";
import thunk from 'redux-thunk';

//в итоге возвращается один большой rootReducer а не reducers

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

const sagaMiddleware = createSagaMiddleware()

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware, thunk)));

export type AppStateType = ReturnType<typeof rootReducer>;

sagaMiddleware.run(rootSaga);

export default store;

//@ts-ignore
window.store = store;

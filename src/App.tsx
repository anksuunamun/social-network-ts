import React, {ComponentType} from 'react';
import './App.css';
import HeaderContainer from './Components/Header/HeaderContainer';
import NavbarContainer from './Components/Navbar/NavbarContainer';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import Login from './Components/Login/Login';
import {compose} from 'redux';
import {connect, Provider} from 'react-redux';
import store, {AppStateType} from './redux-store/redux-store';
import {setAppInitTC} from './redux-store/app-reducer';
import Preloader from './Components/Common/Preloader/Preloader';
import {withSuspense} from './HOC/withSuspense/withSuspense';

const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./Components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./Components/Users/UsersContainer'));
const NewsContainer = React.lazy(() => import('./Components/News/NewsContainer'));
const SettingsContainer = React.lazy(() => import('./Components/Settings/SettingsContainer'));

class App extends React.Component<MStPType & MDTPType> {

    componentDidMount() {
        this.props.setAppInitTC();
    }

    render() {
        return (
            <>
                {this.props.isAppInitialized
                    ? <div className="appWrapper">
                        <HeaderContainer/>
                        <NavbarContainer/>
                        <Route path={'/profile/:userId?'} component={withSuspense(ProfileContainer)}/>
                        <Route path={'/messages'} component={withSuspense(DialogsContainer)}/>
                        <Route path={'/users'} component={withSuspense(UsersContainer)}/>
                        <Route path={'/news'} component={withSuspense(NewsContainer)}/>
                        <Route path={'/settings'} component={withSuspense(SettingsContainer)}/>
                        <Route path={'/login'} render={() => <Login/>}/>
                    </div>
                    : <Preloader/>
                }</>
        )

    }

}

const mapStateToProps = (state: AppStateType): MStPType => ({
        isAppInitialized: state.app.isAppInitialized
    }

)
type MStPType =
    {
        isAppInitialized: boolean
    }
type MDTPType =
    {
        setAppInitTC: () => void
    }

const AppContainer = compose
    < ComponentType > (withRouter,
            connect(mapStateToProps, {setAppInitTC})
    )(App)

const FinalAppComponent: React.FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}

export default FinalAppComponent;

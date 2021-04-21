import React, {ComponentType} from 'react';
import './App.css';
import HeaderContainer from './Components/Header/HeaderContainer';
import NavbarContainer from './Components/Navbar/NavbarContainer';
import ProfileContainer from './Components/Profile/ProfileContainer';
import {Route, withRouter} from 'react-router-dom';
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import UsersContainer from './Components/Users/UsersContainer';
import SettingsContainer from './Components/Settings/SettingsContainer';
import NewsContainer from './Components/News/NewsContainer';
import Login from './Components/Login/Login';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {AppStateType} from './redux-store/redux-store';
import {setAppInitTC} from './redux-store/app-reducer';
import Preloader from './Components/Common/Preloader/Preloader';

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
                        <Route path={'/profile/:userId?'} render={() => <ProfileContainer/>}/>
                        <Route path={'/messages'} render={() => <DialogsContainer/>}/>
                        <Route path={'/users'} render={() => <UsersContainer/>}/>
                        <Route path={'/news'} render={() => <NewsContainer/>}/>
                        <Route path={'/settings'} render={() => <SettingsContainer/>}/>
                        <Route path={'/login'} render={() => <Login/>}/>
                    </div>
                    : <Preloader/>
                }</>
        )

    }
}

const mapStateToProps = (state: AppStateType): MStPType => ({isAppInitialized: state.app.isAppInitialized})
type MStPType = {
    isAppInitialized: boolean
}
type MDTPType = {
    setAppInitTC: () => void
}


export default compose<ComponentType>(withRouter,
    connect(mapStateToProps, {setAppInitTC})
)(App);

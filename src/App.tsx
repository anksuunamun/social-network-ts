import React from 'react';
import './App.css';
import HeaderContainer from './Components/Header/HeaderContainer';
import NavbarContainer from './Components/Navbar/NavbarContainer';
import ProfileContainer from './Components/Profile/ProfileContainer';
import {Route} from 'react-router-dom';
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import UsersContainer from './Components/Users/UsersContainer';
import SettingsContainer from './Components/Settings/SettingsContainer';
import NewsContainer from './Components/News/NewsContainer';

function App() {
    return (
        <div className="appWrapper">
            <HeaderContainer/>
            <NavbarContainer/>
            <Route path={'/profile'} render={() => <ProfileContainer/>}/>
            <Route path={'/messages'} render={() => <DialogsContainer/>}/>
            <Route path={'/users'} render={() => <UsersContainer/>}/>
            <Route path={'/news'} render={() => <NewsContainer/>}/>
            <Route path={'/settings'} render={() => <SettingsContainer/>}/>

        </div>
    );
}

export default App;

import React from 'react';
import './App.css';
import {Route} from 'react-router-dom';

import HeaderContainer from './Components/Header/HeaderContainer';
import NavbarContainer from './Components/Navbar/NavbarContainer';
import ProfileContainer from './Components/Profile/ProfileContainer';


function App() {
    return (
        <div className="appWrapper">
            <HeaderContainer/>
            <NavbarContainer/>
            <Route path={"/profile"} render={ () => <ProfileContainer />}/>


        </div>

    );
}

export default App;

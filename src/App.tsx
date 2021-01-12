import React from 'react';
import './App.css';
import HeaderContainer from './Components/Header/HeaderContainer';
import NavbarContainer from './Components/Navbar/NavbarContainer';
import ProfileContainer from './Components/Profile/ProfileContainer';

function App() {
    return (
        <div className="appWrapper">
            <HeaderContainer/>
            <NavbarContainer/>
            <ProfileContainer />
        </div>
    );
}

export default App;

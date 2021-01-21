import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';


class ProfileContainerAjax extends React.Component<any, any> {
    render() {
        return (
            <>
                <Profile posts={this.props.posts}/>
            </>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        "posts": state.profilePage.posts,
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {

    }
}


const ProfileContainer = connect(mapStateToProps,mapDispatchToProps)(withRouter(ProfileContainerAjax))

export default ProfileContainer;
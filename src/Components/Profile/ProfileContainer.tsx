import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {addPostAC} from '../../redux-store/Profile-reducer';


class ProfileContainerAjax extends React.Component<any, any> {
    render() {
        return (
            <>
                <Profile posts={this.props.posts} addPost={this.props.addPostAC}/>
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
        addPostAC: (postText: string | number | readonly string[] | undefined) => dispatch(addPostAC(postText))
    }
}


const ProfileContainer = connect(mapStateToProps,mapDispatchToProps)(withRouter(ProfileContainerAjax))

export default ProfileContainer;
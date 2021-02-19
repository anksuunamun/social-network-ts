import React from 'react';
import {Dispatch} from 'redux';
import Profile from './Profile';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {addPostAC, changeLikesAC, ProfileReducerStateType} from '../../redux-store/Profile-reducer';
import {AppStateType} from '../../redux-store/redux-store';


class ProfileContainerAjax extends React.Component<any, any> {
    render() {
        return (
            <>
                <Profile posts={this.props.posts}
                         addPostAC={this.props.addPostAC}
                         changeLikesAC={this.props.changeLikesAC}/>
            </>
        )
    }
}


type MapDispatchToPropsType = {
    addPostAC: (postText: string | number | readonly string[] | undefined) => void
    changeLikesAC: (id: string, upOrDown: 'up' | 'down') => void
}

// type MapStateToPropsType = {
//     profilePage: ProfileReducerStateType,
// }

export type ProfilePropsType = MapDispatchToPropsType & ProfileReducerStateType

const mapStateToProps = (state: AppStateType): ProfileReducerStateType => {
    return {
        'posts': state.profilePage.posts,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPostAC: (postText: string | number | readonly string[] | undefined) => dispatch(addPostAC(postText)),
        changeLikesAC: (id: string, upOrDown: 'up' | 'down') => dispatch(changeLikesAC(id, upOrDown)),
    }
}


const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileContainerAjax))

export default ProfileContainer;
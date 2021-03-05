import React from 'react';
import {Dispatch} from 'redux';
import Profile from './Profile';
import {connect} from 'react-redux';
import {addPostAC, changeLikesAC, PostsType} from '../../redux-store/Profile-reducer';
import {AppStateType} from '../../redux-store/redux-store';

type ProfileContainerAjaxPropsType = MapDispatchToPropsType & MapStateToPropsType
type ProfileContainerAjaxStateType = {}

class ProfileContainerAjax extends React.Component<ProfileContainerAjaxPropsType, ProfileContainerAjaxStateType> {
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

type MapStateToPropsType = {
    'posts': Array<PostsType>,
}

export type ProfilePropsType = MapDispatchToPropsType & MapStateToPropsType

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
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


const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileContainerAjax)

export default ProfileContainer;
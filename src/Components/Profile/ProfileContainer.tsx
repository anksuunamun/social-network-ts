import React from 'react';
import {Dispatch} from 'redux';
import Profile from './Profile';
import {connect} from 'react-redux';
import {addPostAC, changeLikesAC, PostsType, setProfileAC, UserType} from '../../redux-store/Profile-reducer';
import {AppStateType} from '../../redux-store/redux-store';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import axios, {AxiosResponse} from 'axios';

type ProfileContainerAjaxPropsType = MapDispatchToPropsType & MapStateToPropsType
type ProfileContainerAjaxStateType = {}

type PathParamsType = {
    userId: string
}

type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerAjaxPropsType & ProfileContainerAjaxStateType

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = '7870'
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then((response: AxiosResponse) => {
                    this.props.setProfile(response.data);
                    console.log(response)
                }
            )
    }

    render() {
        return (
            <Profile posts={this.props.posts}
                     addPostAC={this.props.addPostAC}
                     changeLikesAC={this.props.changeLikesAC}
                     user={this.props.user}
                     setProfile={this.props.setProfile}/>
        )
    }
}


type MapDispatchToPropsType = {
    addPostAC: (postText: string) => void
    changeLikesAC: (id: string, upOrDown: 'up' | 'down') => void
    setProfile: (user: UserType) => void
}

type MapStateToPropsType = {
    'posts': Array<PostsType>,
    'user': UserType | null
}

export type ProfilePropsType = MapDispatchToPropsType & MapStateToPropsType

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        'posts': state.profilePage.posts,
        'user': state.profilePage.user
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPostAC: (postText: string) => dispatch(addPostAC(postText)),
        changeLikesAC: (id: string, upOrDown: 'up' | 'down') => dispatch(changeLikesAC(id, upOrDown)),
        setProfile: (user: UserType) => dispatch(setProfileAC(user))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileContainer));
//благодаря withRouter в пропсы компонента приходят доп.пропсы, match, location, history, staticContext

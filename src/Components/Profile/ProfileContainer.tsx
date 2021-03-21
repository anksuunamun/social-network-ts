import React from 'react';
import {Dispatch} from 'redux';
import Profile from './Profile';
import {connect} from 'react-redux';
import {
    addPostAC,
    changeLikesAC,
    PostsType,
    setIsFetchingAC,
    setProfileAC,
    UserType
} from '../../redux-store/Profile-reducer';
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

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = '7870'
        }
        this.props.setIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then((response: AxiosResponse) => {
                    this.props.setProfile(response.data);
                    this.props.setIsFetching(false);
                }
            )
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.refreshProfile();
        }
    }


    render() {
        return (
            <Profile {...this.props}/>
        )
    }
}


type MapDispatchToPropsType = {
    addPostAC: (postText: string) => void
    changeLikesAC: (id: string, upOrDown: 'up' | 'down') => void
    setProfile: (user: UserType) => void
    setIsFetching: (isFetching: boolean) => void
}

type MapStateToPropsType = {
    'posts': Array<PostsType>,
    'user': UserType | null
    'isFetching': boolean
}

export type ProfilePropsType = MapDispatchToPropsType & MapStateToPropsType

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        'posts': state.profilePage.posts,
        'user': state.profilePage.user,
        'isFetching': state.profilePage.isFetching
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPostAC: (postText: string) => dispatch(addPostAC(postText)),
        changeLikesAC: (id: string, upOrDown: 'up' | 'down') => dispatch(changeLikesAC(id, upOrDown)),
        setProfile: (user: UserType) => dispatch(setProfileAC(user)),
        setIsFetching: (isFetching: boolean) => dispatch(setIsFetchingAC(isFetching)),
    }
}


export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(withRouter(ProfileContainer))
//благодаря withRouter в пропсы компонента приходят доп.пропсы, match, location, history, staticContext

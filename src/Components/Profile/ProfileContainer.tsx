import React from 'react';
import {compose, Dispatch} from 'redux';
import Profile from './Profile';
import {connect} from 'react-redux';
import {
    addPostAC,
    changeLikesAC, getUserProfileThunkAC, getUserStatusThunkAC,
    PostsType,
    setIsFetchingAC,
    setProfileAC, setUserPhotoAC, setUserStatusAC, updateProfilePhotoThunkAC, updateUserStatusThunkAC, UserProfileType
} from '../../redux-store/Profile-reducer';
import {AppStateType} from '../../redux-store/redux-store';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {ThunkDispatch} from 'redux-thunk';
import {ActionsType} from '../../redux-store/Profile-reducer'
import {withAuthRedirect} from '../../HOC/withAuthRedirect/withAuthRedirect';

type ProfileContainerAjaxPropsType = MapDispatchToPropsType & MapStateToPropsType
type ProfileContainerAjaxStateType = {}

type PathParamsType = {
    userId: string
}

type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerAjaxPropsType & ProfileContainerAjaxStateType

class ProfileContainer extends React.PureComponent<PropsType> {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = String(this.props.authUserId)
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfileThunkAC(+userId);
        this.props.getUserStatusThunkAC(+userId)
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
    setProfile: (user: UserProfileType) => void
    setIsFetching: (isFetching: boolean) => void
    setUserPhoto: (photo: string) => void
    setUserStatus: (status: string) => void
    getUserProfileThunkAC: (userId: number) => void
    getUserStatusThunkAC: (userId: number) => void
    updateProfilePhotoThunkAC: (formData: any) => void
    updateUserStatusThunkAC: (status: string) => void
}

type MapStateToPropsType = {
    'posts': Array<PostsType>
    'user': UserProfileType | null
    'isFetching': boolean
    'id': number | null
    'userStatus': string
    'isAuth': boolean
    'authUserId': number | null
}

export type ProfilePropsType = MapDispatchToPropsType & MapStateToPropsType

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        'posts': state.profilePage.posts,
        'user': state.profilePage.user,
        'isFetching': state.profilePage.isFetching,
        'id': state.auth.id,
        'userStatus': state.profilePage.userStatus,
        'isAuth': state.auth.isAuth,
        'authUserId': state.auth.id,
    }
}

const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<AppStateType, unknown, ActionsType>): MapDispatchToPropsType => {
    return {
        addPostAC: (postText: string) => dispatch(addPostAC(postText)),
        changeLikesAC: (id: string, upOrDown: 'up' | 'down') => dispatch(changeLikesAC(id, upOrDown)),
        setProfile: (user: UserProfileType) => dispatch(setProfileAC(user)),
        setIsFetching: (isFetching: boolean) => dispatch(setIsFetchingAC(isFetching)),
        setUserPhoto: (photo: string) => dispatch(setUserPhotoAC(photo)),
        setUserStatus: (status: string) => dispatch(setUserStatusAC(status)),
        getUserProfileThunkAC: (userId: number) => dispatch(getUserProfileThunkAC(userId)),
        getUserStatusThunkAC: (userId: number) => dispatch(getUserStatusThunkAC(userId)),
        updateProfilePhotoThunkAC: (formData: any) => dispatch(updateProfilePhotoThunkAC(formData)),
        updateUserStatusThunkAC: (status: string) => dispatch(updateUserStatusThunkAC(status)),
    }
}

export default compose<React.ComponentType>(
    withRouter,
    withAuthRedirect,
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)
)(ProfileContainer)

//благодаря withRouter в пропсы компонента приходят доп.пропсы, match, location, history, staticContext

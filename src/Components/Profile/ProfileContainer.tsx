import React from 'react';
import {Dispatch} from 'redux';
import Profile from './Profile';
import {connect} from 'react-redux';
import {
    addPostAC,
    changeLikesAC, getUserProfileThunkAC, getUserStatusThunkAC,
    PostsType,
    setIsFetchingAC,
    setProfileAC, setUserPhotoAC, setUserStatusAC, updateProfilePhotoThunkAC, UserType
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

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = '7870'
        }
        this.props.getUserProfileThunkAC(+userId);
        this.props.getUserStatusThunkAC(+userId);
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
    setUserPhoto: (photo: string) => void
    setUserStatus: (status: string) => void
    getUserProfileThunkAC: (userId: number) => void
    getUserStatusThunkAC: (userId: number) => void
    updateProfilePhotoThunkAC: (formData: any) => void
}

type MapStateToPropsType = {
    'posts': Array<PostsType>
    'user': UserType | null
    'isFetching': boolean
    'id': number | null
    'userStatus': string
}

export type ProfilePropsType = MapDispatchToPropsType & MapStateToPropsType

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        'posts': state.profilePage.posts,
        'user': state.profilePage.user,
        'isFetching': state.profilePage.isFetching,
        'id': state.auth.id,
        'userStatus': state.profilePage.userStatus,
    }
}

const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<AppStateType, unknown, ActionsType>): MapDispatchToPropsType => {
    return {
        addPostAC: (postText: string) => dispatch(addPostAC(postText)),
        changeLikesAC: (id: string, upOrDown: 'up' | 'down') => dispatch(changeLikesAC(id, upOrDown)),
        setProfile: (user: UserType) => dispatch(setProfileAC(user)),
        setIsFetching: (isFetching: boolean) => dispatch(setIsFetchingAC(isFetching)),
        setUserPhoto: (photo: string) => dispatch(setUserPhotoAC(photo)),
        setUserStatus: (status: string) => dispatch(setUserStatusAC(status)),
        getUserProfileThunkAC: (userId: number) => dispatch(getUserProfileThunkAC(userId)),
        getUserStatusThunkAC: (userId: number) => dispatch(getUserStatusThunkAC(userId)),
        updateProfilePhotoThunkAC: (formData: any) => dispatch(updateProfilePhotoThunkAC(formData)),
    }
}


export default withAuthRedirect(connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(withRouter(ProfileContainer)))
//благодаря withRouter в пропсы компонента приходят доп.пропсы, match, location, history, staticContext

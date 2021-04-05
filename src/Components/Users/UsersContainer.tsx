import React from 'react';
import Users from './Users';
import {AppStateType} from '../../redux-store/redux-store';
import {compose, Dispatch} from 'redux';
import {
    ActionType, followThunkAC,
    getUsersThunkAC, onPageClickThunkAC,
    unfollowThunkAC,
    UserType
} from '../../redux-store/Users-reducer';
import {connect} from 'react-redux';
import {withAuthRedirect} from '../../HOC/withAuthRedirect/withAuthRedirect';
import {ThunkDispatch} from 'redux-thunk';


type UsersContainerPropsType = MapStateToPropsType & MapDispatchToPropsType
type UsersContainerStateType = {}
export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType & UsersOwnProps
type UsersOwnProps = {
    onPageClickHandler: (page: number) => void
}

type MapDispatchToPropsType = {
    getUsersThunkAC: (portionSize: number, currentPage: number) => void
    onPageClickThunkAC: (portionSize: number, currentPage: number) => void
    onFollow: (userId: number) => void
    onUnfollow: (userId: number) => void
}

type MapStateToPropsType = {
    'users': Array<UserType>,
    totalCount: number
    currentPage: number
    portionSize: number
    isLoading: boolean
    disabledButtons: number[]
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        'users': state.usersPage.users,
        'totalCount': state.usersPage.totalCount,
        'currentPage': state.usersPage.currentPage,
        'portionSize': state.usersPage.portionSize,
        'isLoading': state.usersPage.isLoading,
        'disabledButtons': state.usersPage.disabledButtons,
    }
}

const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<AppStateType, unknown, ActionType>): MapDispatchToPropsType => {
    return {
        getUsersThunkAC: (portionSize: number, currentPage: number) => dispatch(getUsersThunkAC(portionSize, currentPage)),
        onPageClickThunkAC: (portionSize: number, currentPage: number) => dispatch(onPageClickThunkAC(portionSize, currentPage)),
        onFollow: (userId: number) => dispatch(followThunkAC(userId)),
        onUnfollow: (userId: number) => dispatch(unfollowThunkAC(userId)),
    }
}

class UsersContainer extends React.Component<UsersContainerPropsType, UsersContainerStateType> {

    // constructor(props: UsersContainerPropsType) {
    //     super(props);
    // }

    componentDidMount() {
        this.props.getUsersThunkAC(this.props.portionSize, this.props.currentPage);
    }

    onPageClickHandler = (page: number) => {
        this.props.onPageClickThunkAC(this.props.portionSize, page);
    }

    render() {
        return (
            <Users {...this.props}
                   onPageClickHandler={this.onPageClickHandler}
            />
        )
    }

}

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(UsersContainer)
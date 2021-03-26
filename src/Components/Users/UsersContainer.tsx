import React from 'react';
import Users from './Users';
import {AppStateType} from '../../redux-store/redux-store';
import {compose, Dispatch} from 'redux';
import {
    ActionType,
    FollowUserAC, getUsersThunkAC, onPageClickThunkAC, SetCurrentPageAC, setDisabledButtonAC,
    setIsLoadingAC,
    setTotalCountAC,
    setUsersAC,
    UnFollowUserAC,
    UserType
} from '../../redux-store/Users-reducer';
import {connect} from 'react-redux';
// const axios = require('axios');
import {usersAPI} from '../../data-access-layer/api';
import {withAuthRedirect} from '../../HOC/withAuthRedirect/withAuthRedirect';
import {ThunkDispatch} from 'redux-thunk';


type UsersContainerPropsType = MapStateToPropsType & MapDispatchToPropsType
type UsersContainerStateType = {}
export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType & UsersOwnProps
type UsersOwnProps = {
    onPageClickHandler: (page: number) => void
}

type MapDispatchToPropsType = {
    setUsers: (users: Array<UserType>) => void
    followUser: (id: number) => void
    unfollowUser: (id: number) => void
    setTotalCount: (value: number) => void
    setIsLoading: (value: boolean) => void
    setCurrentPage: (page: number) => void
    setDisabledButton: (id: number, isFetching: boolean) => void
    getUsersThunkAC: (portionSize: number, currentPage: number) => void
    onPageClickThunkAC: (portionSize: number, currentPage: number) => void
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
        setUsers: (users: Array<UserType>) => dispatch(setUsersAC(users)),
        followUser: (id: number) => dispatch(FollowUserAC(id)),
        unfollowUser: (id: number) => dispatch(UnFollowUserAC(id)),
        setTotalCount: (totalCount: number) => dispatch(setTotalCountAC(totalCount)),
        setIsLoading: (isLoading: boolean) => dispatch(setIsLoadingAC(isLoading)),
        setCurrentPage: (currentPage: number) => dispatch(SetCurrentPageAC(currentPage)),
        setDisabledButton: (id: number, isFetching: boolean) => dispatch(setDisabledButtonAC(id, isFetching)),
        getUsersThunkAC: (portionSize: number, currentPage: number) => dispatch(getUsersThunkAC(portionSize, currentPage)),
        onPageClickThunkAC: (portionSize: number, currentPage: number) => dispatch(onPageClickThunkAC(portionSize, currentPage)),
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
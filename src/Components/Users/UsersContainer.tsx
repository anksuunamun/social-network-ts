import React from 'react';
import Users from './Users';
import {AppStateType} from '../../redux-store/redux-store';
import {Dispatch} from 'redux';
import {
    FollowUserAC, SetCurrentPageAC, setDisabledButtonAC,
    setIsLoadingAC,
    setTotalCountAC,
    setUsersAC,
    UnFollowUserAC,
    UserType
} from '../../redux-store/Users-reducer';
import {connect} from 'react-redux';
// const axios = require('axios');
import {usersAPI} from '../../data-access-layer/api';

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

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        setUsers: (users: Array<UserType>) => dispatch(setUsersAC(users)),
        followUser: (id: number) => dispatch(FollowUserAC(id)),
        unfollowUser: (id: number) => dispatch(UnFollowUserAC(id)),
        setTotalCount: (totalCount: number) => dispatch(setTotalCountAC(totalCount)),
        setIsLoading: (isLoading: boolean) => dispatch(setIsLoadingAC(isLoading)),
        setCurrentPage: (currentPage: number) => dispatch(SetCurrentPageAC(currentPage)),
        setDisabledButton: (id: number, isFetching: boolean) => dispatch(setDisabledButtonAC(id, isFetching))
    }
}

class UsersContainer extends React.Component<UsersContainerPropsType, UsersContainerStateType> {

    // constructor(props: UsersContainerPropsType) {
    //     super(props);
    // }

    componentDidMount() {
        usersAPI.getUsers(this.props.portionSize, this.props.currentPage)
            .then((response) => {
                    this.props.setUsers(response.items);
                    this.props.setTotalCount(response.totalCount);
                    this.props.setIsLoading(false);
                }
            )
    }

    onPageClickHandler = (page: number) => {
        this.props.setIsLoading(true);
        this.props.setCurrentPage(page);
        usersAPI.getUsers(this.props.portionSize, page)
            .then((response) => {
                    this.props.setUsers(response.items);
                    this.props.setIsLoading(false);
                }
            )
    }

    render() {
        return (
            <Users users={this.props.users}
                   setUsers={this.props.setUsers}
                   followUser={this.props.followUser}
                   unfollowUser={this.props.unfollowUser}
                   setTotalCount={this.props.setTotalCount}
                   totalCount={this.props.totalCount}
                   portionSize={this.props.portionSize}
                   currentPage={this.props.currentPage}
                   isLoading={this.props.isLoading}
                   setIsLoading={this.props.setIsLoading}
                   setCurrentPage={this.props.setCurrentPage}
                   disabledButtons={this.props.disabledButtons}
                   setDisabledButton={this.props.setDisabledButton}
                   onPageClickHandler={this.onPageClickHandler}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
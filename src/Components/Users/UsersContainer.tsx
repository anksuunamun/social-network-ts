import React from 'react';
import Users from './Users';
import {AxiosResponse} from 'axios';
import {AppStateType} from '../../redux-store/redux-store';
import {Dispatch} from 'redux';
import {
    FollowUserAC, SetCurrentPageAC,
    setIsLoadingAC,
    setTotalCountAC,
    setUsersAC,
    UnFollowUserAC,
    UserType
} from '../../redux-store/Users-reducer';
import {connect} from 'react-redux';

// const axios = require('axios');
import axios from 'axios';

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
}

type MapStateToPropsType = {
    'users': Array<UserType>,
    totalCount: number
    currentPage: number
    portionSize: number
    isLoading: boolean
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        'users': state.usersPage.users,
        'totalCount': state.usersPage.totalCount,
        'currentPage': state.usersPage.currentPage,
        'portionSize': state.usersPage.portionSize,
        'isLoading': state.usersPage.isLoading,
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
    }
}

class UsersContainer extends React.Component<UsersContainerPropsType, UsersContainerStateType> {

    // constructor(props: UsersContainerPropsType) {
    //     super(props);
    // }

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.portionSize}&page=${this.props.currentPage}`)
            .then((response: AxiosResponse) => {
                    this.props.setUsers(response.data.items)
                    this.props.setTotalCount(response.data.totalCount)
                    this.props.setIsLoading(false)
                }
            )
    }

    onPageClickHandler = (page: number) => {
        this.props.setIsLoading(true);
        this.props.setCurrentPage(page);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.portionSize}&page=${page}`)
            .then((response: AxiosResponse) => {
                    this.props.setUsers(response.data.items)
                    this.props.setIsLoading(false)
                    console.log(response.data)
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
                   onPageClickHandler={this.onPageClickHandler}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
import React from 'react';
import Users from './Users';
import {AxiosResponse} from 'axios';
import {AppStateType} from '../../redux-store/redux-store';
import {Dispatch} from 'redux';
import {FollowUserAC, setUsersAC, UnFollowUserAC, UserType} from '../../redux-store/Users-reducer';
import {connect} from 'react-redux';

const axios = require('axios');

type UsersContainerPropsType = MapStateToPropsType & MapDispatchToPropsType
type UsersContainerStateType = {}
export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

type MapDispatchToPropsType = {
    setUsers: (users: Array<UserType>) => void
    followUser: (id: number) => void
    unfollowUser: (id: number) => void
}

type MapStateToPropsType = {
    'users': Array<UserType>,
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        'users': state.usersPage.users,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        setUsers: (users: Array<UserType>) => dispatch(setUsersAC(users)),
        followUser: (id: number) => dispatch(FollowUserAC(id)),
        unfollowUser: (id: number) => dispatch(UnFollowUserAC(id)),
    }
}

class UsersContainer extends React.Component<UsersContainerPropsType, UsersContainerStateType> {

    // constructor(props: UsersContainerPropsType) {
    //     super(props);
    // }

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then((response: AxiosResponse) => {
                    this.props.setUsers(response.data.items)
                }
            )

    }

    render() {
        return (
            <Users users={this.props.users}
                   setUsers={this.props.setUsers}
                   followUser={this.props.followUser}
                   unfollowUser={this.props.unfollowUser}/>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
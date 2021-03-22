import React from 'react';
import Header from './Header';
import {AppStateType} from '../../redux-store/redux-store';
import {Dispatch} from 'redux';
import {setIsFetching, setUserAuth} from '../../redux-store/auth-reducer';
import {connect} from 'react-redux';
import {authAPI} from '../../data-access-layer/api';

type MapStateToPropsType = {
    id: number | null
    login: string | null
    email: string | null
    isFetching: boolean
}
type MapDispatchToPropsType = {
    setUserAuth: (id: number, login: string, email: string) => void
    setIsFetching: (isFetching: boolean) => void
}
type HeaderContainerPropsType = MapStateToPropsType & MapDispatchToPropsType;
export type HeaderPropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        id: state.auth.id,
        login: state.auth.login,
        email: state.auth.email,
        isFetching: state.auth.isFetching,
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        setUserAuth: (id: number, login: string, email: string) => dispatch(setUserAuth(id, login, email)),
        setIsFetching: (isFetching: boolean) => dispatch(setIsFetching(isFetching)),
    }
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    componentDidMount() {
        this.props.setIsFetching(true);
        authAPI.getAuth().then(
            response => {
                if (response.resultCode === 0) {
                    let {id, login, email} = response.data;
                    this.props.setUserAuth(id, login, email);
                    this.props.setIsFetching(false);
                }
            }
        )
        //
        //     axios.put(`https://social-network.samuraijs.com/api/1.0/profile/status`, {status: 'Всё уже получается! 🚀'}, {
        //         withCredentials: true,
        //         headers: {
        //             'API-KEY': '7adf2309-2d93-43e6-88f1-3d5c166ae533',
        //         }
        //     }).then(response=> console.log(response))
    }

    render() {
        return (
            <>
                <Header {...this.props}/>
            </>
        )
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
import React from 'react';
import Header from './Header';
import axios from 'axios';
import {AppStateType} from '../../redux-store/redux-store';
import {Dispatch} from 'redux';
import {setIsFetching, setUserAuth} from '../../redux-store/auth-reducer';
import {connect} from 'react-redux';
import dva from '../../Assets/Images/146347464817597212.jpg';

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
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true,
            headers: {
                'API-KEY': '7adf2309-2d93-43e6-88f1-3d5c166ae533',
            }
        }).then(
            response => {
                if (response.data.resultCode === 0) {
                    let {id, login, email} = response.data.data;
                    this.props.setUserAuth(id, login, email);
                    this.props.setIsFetching(false);
                }
            }
        )

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
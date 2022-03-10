import React from 'react';
import Header from './Header';
import { AppStateType } from '../../redux-store/redux-store';
import { Dispatch } from 'redux';
import {
  ActionsType,
  getAuthThunkAC,
  logOutThunk,
  setIsFetching,
  setUserAuth,
} from '../../redux-store/auth-reducer';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

type MapStateToPropsType = {
  id: number | null;
  login: string | null;
  email: string | null;
  isFetching: boolean;
  isAuth: boolean;
};
type MapDispatchToPropsType = {
  setUserAuth: (id: number, login: string, email: string) => void;
  setIsFetching: (isFetching: boolean) => void;
  getAuthThunkAC: () => void;
  logOutThunk: () => void;
};
type HeaderContainerPropsType = MapStateToPropsType & MapDispatchToPropsType;
export type HeaderPropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    id: state.auth.id,
    login: state.auth.login,
    email: state.auth.email,
    isFetching: state.auth.isFetching,
    isAuth: state.auth.isAuth,
  };
};
const mapDispatchToProps = (
  dispatch: Dispatch & ThunkDispatch<AppStateType, unknown, ActionsType>,
): MapDispatchToPropsType => {
  return {
    setUserAuth: (id: number, login: string, email: string) =>
      dispatch(setUserAuth(id, login, email)),
    setIsFetching: (isFetching: boolean) => dispatch(setIsFetching(isFetching)),
    getAuthThunkAC: () => dispatch(getAuthThunkAC()),
    logOutThunk: () => dispatch(logOutThunk()),
  };
};

class HeaderContainer extends React.PureComponent<HeaderContainerPropsType> {
  render() {
    return (
      <>
        <Header {...this.props} />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);

import React, { ComponentType } from 'react';
import { AppStateType } from '../../redux-store/redux-store';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    isAuth: state.auth.isAuth,
  };
};
type MapStateToPropsType = {
  isAuth: boolean;
};

export function withAuthRedirect<T>(Component: ComponentType<T>) {
  const RedirectComponent = (props: MapStateToPropsType) => {
    const { isAuth, ...restProps } = props;
    return <>{isAuth ? <Component {...(restProps as T)} /> : <Redirect to={'/login'} />}</>;
  };
  return connect(mapStateToProps)(RedirectComponent);
}

import React, {useCallback} from 'react';
import {reduxForm, Field, InjectedFormProps} from 'redux-form';
import {createField, Input} from '../Common/FieldControls/FieldControls';
import {maxLength, minLength, required} from '../../utils/validators/formValidators';
import PurpleButton from '../Common/PurpleButton/PurpleButton';
import {ActionsType, logInThunk} from '../../redux-store/auth-reducer';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux-store/redux-store';
import {Dispatch} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {Redirect} from 'react-router-dom';


export type LoginPropsType = {}

export type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const maxLength30 = maxLength(30);
const minLength5 = minLength(5);

let LoginForm = React.memo(function (props: InjectedFormProps<FormDataType>) {
    return (<>
            <form onSubmit={props.handleSubmit}>
                {createField(Input, 'login', 'text', [required, maxLength30, minLength5], 'Login', 'userLogin')}
                {createField(Input, 'password', 'password', [required, maxLength30, minLength5], 'Password', 'userPassword')}
                {props.error ? <div>{props.error}</div> : ''}
                {createField('input', 'rememberMe', 'checkbox')}
                <PurpleButton text={'log in'}/>
            </form>
        </>
    )
})

const LoginReduxForm = reduxForm<FormDataType>({form: 'loginForm'})(LoginForm)

const Login = React.memo(function (props: LoginPropsType & MapDispatchToPropsType & MapStateToPropsType) {
    const onHandleSubmit = useCallback((formData: FormDataType) => {
        props.logInThunk(formData.login, formData.password, formData.rememberMe)
    }, [props.logInThunk])
    return (
        <div className={'contentWrapper'}>
            {props.isAuth ? <Redirect to={'/profile'}/> : <LoginReduxForm onSubmit={onHandleSubmit}/>}
        </div>
    )
})
type MapDispatchToPropsType = {
    logInThunk: (email: string, password: string, rememberMe: boolean) => void
}
type MapStateToPropsType = {
    isAuth: boolean
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<AppStateType, unknown, ActionsType>): MapDispatchToPropsType => {
    return {
        logInThunk: (email, password, rememberMe) => dispatch(logInThunk(email, password, rememberMe))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
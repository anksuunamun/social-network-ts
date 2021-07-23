import React, {useCallback} from 'react';
import {reduxForm, InjectedFormProps} from 'redux-form';
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
    captcha?: string
}

const maxLength30 = maxLength(30);
const minLength4 = minLength(4);

let LoginForm = React.memo(function (props: InjectedFormProps<FormDataType, AdditionalType> & AdditionalType) {
    return (<>
            <form onSubmit={props.handleSubmit}>
                {createField(Input, 'login', 'text', [required, maxLength30, minLength4], 'Login', 'userLogin')}
                {createField(Input, 'password', 'password', [required, maxLength30, minLength4], 'Password', 'userPassword')}
                {props.error ? <div>{props.error}</div> : ''}
                <br/>
                {props.captchaURL && <img src={props.captchaURL} alt="captcha"/>}
                {props.captchaURL && createField(Input, 'captcha', 'text', [required], 'Enter the characters from the picture.', 'captcha')}
                <br/>
                {createField('input', 'rememberMe', 'checkbox')}
                <PurpleButton text={'log in'} type={'submit'}/>
            </form>
        </>
    )
})

type AdditionalType = {
    captchaURL: string | null
}

const LoginReduxForm = reduxForm<FormDataType, AdditionalType>({form: 'loginForm'})(LoginForm)

const Login = React.memo(function (props: LoginPropsType & MapDispatchToPropsType & MapStateToPropsType) {
    const onHandleSubmit = useCallback((formData: FormDataType) => {
        props.logInThunk(formData.login, formData.password, formData.rememberMe, formData?.captcha)
    }, [props.logInThunk])
    return (
        <div className={'contentWrapper'}>
            {props.isAuth
                ? <Redirect to={'/profile'}/>
                : <LoginReduxForm onSubmit={onHandleSubmit}
                                  captchaURL={props.captchaURL}/>}
        </div>
    )
})
type MapDispatchToPropsType = {
    logInThunk: (email: string, password: string, rememberMe: boolean, captcha?: string) => void
}
type MapStateToPropsType = {
    isAuth: boolean
    captchaURL: string | null
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        captchaURL: state.auth.captchaURL
    }
}

const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<AppStateType, unknown, ActionsType>): MapDispatchToPropsType => {
    return {
        logInThunk: (email, password, rememberMe,captcha?: string) => dispatch(logInThunk(email, password, rememberMe, captcha))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
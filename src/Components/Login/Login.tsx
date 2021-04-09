import React from 'react';
import {reduxForm, Field, InjectedFormProps} from 'redux-form';
import {Input} from '../Common/FieldControls/FieldControls';
import {maxLength, minLength, required} from '../../utils/validators/formValidators';
import PurpleButton from '../Common/PurpleButton/PurpleButton';
import {ActionsType, logInThunk} from '../../redux-store/auth-reducer';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux-store/redux-store';
import {Dispatch} from 'redux';
import {ThunkDispatch} from 'redux-thunk';


export type LoginPropsType = {}

export type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const maxLength30 = maxLength(30);
const minLength5 = minLength(5);

let LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Input}
                   type={'text'}
                   name={'login'}
                   validate={[required, maxLength30, minLength5]}
                   label={'Login'}
                   id={'userLogin'}/>
            <Field component={Input}
                   name={'password'}
                   type={'password'}
                   validate={[required, maxLength30, minLength5]}
                   label={'Password'}
                   id={'userPassword'}/>
            <Field component={'input'}
                   type={'checkbox'}
                   name={'rememberMe'}/>
            <button>Log in</button>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'loginForm'})(LoginForm)

const Login: React.FC<LoginPropsType & MapDispatchToPropsType> = (props) => {
    const onHandleSubmit = (formData: FormDataType) => {
        console.log(formData)
        props.logInThunk(formData.login, formData.password, formData.rememberMe)
    }
    return (
        <div className={'contentWrapper'}>
            <LoginReduxForm onSubmit={onHandleSubmit}/>
        </div>
    )
}

type MapDispatchToPropsType = {
    logInThunk: (email: string, password: string, rememberMe: boolean) => void
}

const mapDispatchToProps = (dispatch: Dispatch & ThunkDispatch<AppStateType, unknown, ActionsType>): MapDispatchToPropsType => {
    return {
        logInThunk: (email, password, rememberMe) => dispatch(logInThunk(email, password, rememberMe))
    }
}

export default connect(null, mapDispatchToProps)(Login);
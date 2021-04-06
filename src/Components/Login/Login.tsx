import React from 'react';
import {reduxForm, Field, InjectedFormProps} from 'redux-form';

type LoginPropsType = {}

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

let LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={'input'}
                       type={'text'}
                       name={'login'}/>
            </div>
            <div>
                <Field component={'input'}
                       type={'text'}
                       name={'password'}/>
            </div>
            <div>
                <Field component={'input'}
                       type={'checkbox'}
                       name={'rememberMe'}/>
            </div>
            <button>Submit
            </button>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'loginForm'})(LoginForm)

const Login: React.FC<LoginPropsType> = (props) => {
    const onHandleSubmit = (formData: FormDataType) => {
        console.log(formData)
    }
    return (
        <div className={'contentWrapper'}>
            Login
            <LoginReduxForm onSubmit={onHandleSubmit}/>
        </div>
    )
}

export default Login;
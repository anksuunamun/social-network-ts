import React from 'react';
import {reduxForm, Field, InjectedFormProps} from 'redux-form';
import {Input} from '../Common/FieldControls/FieldControls';
import {maxLength, minLength, required} from '../../utils/validators/formValidators';
import PurpleButton from '../Common/PurpleButton/PurpleButton';


export type LoginPropsType = {}

export type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const maxLength15 = maxLength(15);
const minLength5 = minLength(5);

let LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Input}
                   type={'text'}
                   name={'login'}
                   validate={[required, maxLength15, minLength5]}
                   label={'Login'}
                   id={'userLogin'}/>
            <Field component={Input}
                   name={'password'}
                   type={'password'}
                   validate={[required, maxLength15, minLength5]}
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

const Login: React.FC<LoginPropsType> = (props) => {
    const onHandleSubmit = (formData: FormDataType) => {
        console.log(formData)
    }
    return (
        <div className={'contentWrapper'}>
            <LoginReduxForm onSubmit={onHandleSubmit}/>
        </div>
    )
}

export default Login;
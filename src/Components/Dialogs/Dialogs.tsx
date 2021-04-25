import React from 'react';
import styles from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';
import {DialogsPropsType} from './DialogsContainer';
import PurpleButton from '../Common/PurpleButton/PurpleButton';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {createField, TextArea} from '../Common/FieldControls/FieldControls';

type FormPropsType = {
    addMessage: string
}

const AddMessageForm: React.FC<InjectedFormProps<FormPropsType>> = (props) => {
    return (
        <>
            <form onSubmit={props.handleSubmit}>
                {createField(TextArea, 'addMessage')}
                <PurpleButton text={'add message'}/>
            </form>
        </>
    )
}

const AddMessageReduxForm = reduxForm<FormPropsType>({form: 'addMessageForm'})(AddMessageForm)


function Dialogs(props: DialogsPropsType) {

    const onAddMessageFormSubmit = (data: FormPropsType) => {
        props.addMessage(data.addMessage);
    }

    const dialogs = props.dialogs.map(
        item => {
            return (
                <NavLink to={`/messages/${item.id}`}
                         activeClassName={styles.activeUser}
                         key={item.id}>
                    {item.userName}
                </NavLink>
            )
        }
    )
    const messages = props.messages.map(
        item => {
            return (
                <div key={item.id}>
                    {item.messageText}
                </div>
            )
        }
    )

    return (
        <div className={styles.dialogsWrapper + ' contentWrapper'}>
            <div className={styles.usersWrapper}>
                {dialogs}
            </div>
            <div className={styles.messagesWrapper}>
                {messages}
            </div>
            <div className={styles.textareaWrapper}>
                <AddMessageReduxForm onSubmit={onAddMessageFormSubmit}/>
            </div>
        </div>
    )
}

export default Dialogs;
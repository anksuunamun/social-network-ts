import React from 'react';
import styles from './Dialogs.module.css';
import {DialogType, MessageType} from '../../redux-store/Dialogs-reduser';
import {NavLink} from 'react-router-dom';

type DialogsPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}

function Dialogs(props: DialogsPropsType) {
    const dialogs = props.dialogs.map(
        item => {
            return (
                <NavLink to={`/messages/${item.id}`} activeClassName={styles.activeUser}
                         key={item.id}>{item.userName}</NavLink>
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

        </div>
    )
}

export default Dialogs;
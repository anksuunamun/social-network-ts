import React, {ChangeEvent, useState} from 'react';
import styles from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';
import {DialogsPropsType} from './DialogsContainer';
import PurpleButton from '../Common/PurpleButton/PurpleButton';

function Dialogs(props: DialogsPropsType) {

    const [newMessageText, setNewMessageText] = useState<string>('');

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewMessageText(e.currentTarget.value);
    }
    const onClickHandler = () => {
        props.addMessage(newMessageText);
        setNewMessageText('');
    }

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

            <textarea name="newMessage" id="newMessage" cols={30} rows={5} placeholder={'Write something here...'}
                      value={newMessageText} onChange={onChangeHandler}/>
            <PurpleButton text={'Add message'} onButtonClick={onClickHandler}/>
        </div>
    )
}

export default Dialogs;
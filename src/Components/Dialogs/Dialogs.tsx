import React, { useCallback, useMemo } from 'react';
import styles from './Dialogs.module.css';
import { NavLink } from 'react-router-dom';
import { DialogsPropsType } from './DialogsContainer';
import PurpleButton from '../Common/PurpleButton/PurpleButton';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { createField, TextArea } from '../Common/FieldControls/FieldControls';

type FormPropsType = {
  addMessage: string;
};

const AddMessageForm = React.memo(function (props: InjectedFormProps<FormPropsType>) {
  return (
    <>
      <form onSubmit={props.handleSubmit}>
        {createField(TextArea, 'addMessage')}
        <PurpleButton text={'add message'} type={'submit'} />
      </form>
    </>
  );
});

AddMessageForm.displayName = 'AddMessageForm';

const AddMessageReduxForm = reduxForm<FormPropsType>({ form: 'addMessageForm' })(AddMessageForm);

const Dialogs = React.memo(function (props: DialogsPropsType) {
  const onAddMessageFormSubmit = useCallback(
    (data: FormPropsType) => {
      props.addMessage(data.addMessage);
    },
    [props.addMessage],
  );

  const dialogs = useMemo(
    () =>
      props.dialogs.map((item) => {
        return (
          <NavLink to={`/messages/${item.id}`} activeClassName={styles.activeUser} key={item.id}>
            {item.userName}
          </NavLink>
        );
      }),
    [props.dialogs],
  );

  const messages = useMemo(
    () =>
      props.messages.map((item) => {
        return <div key={item.id}>{item.messageText}</div>;
      }),
    [props.messages],
  );

  return (
    <div className={styles.dialogsWrapper + ' contentWrapper'}>
      <div className={styles.usersWrapper}>{dialogs}</div>
      <div className={styles.messagesWrapper}>{messages}</div>
      <div className={styles.textareaWrapper}>
        <AddMessageReduxForm onSubmit={onAddMessageFormSubmit} />
      </div>
    </div>
  );
});

Dialogs.displayName = 'Dialogs';

export default Dialogs;

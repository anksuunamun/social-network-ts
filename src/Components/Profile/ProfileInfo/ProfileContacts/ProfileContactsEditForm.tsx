import React from 'react';
import { createField, Input } from '../../../Common/FieldControls/FieldControls';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { UserContactsType, UserProfileType } from '../../../../redux-store/Profile-reducer';
import { Contact } from './ProfileContacts';

type ProfileContactsEditFormPropsType = {
  user: UserProfileType | null;
  editMode: boolean;
};

const ProfileContactsEditForm: React.FC<
  InjectedFormProps<FormDataType, ProfileContactsEditFormPropsType> &
    ProfileContactsEditFormPropsType
> = (props) => {
  const contacts =
    props.user &&
    props.user.contacts &&
    Object.entries(props.user.contacts).map(([contactKey, value]) => {
      return (
        <Contact
          key={contactKey}
          contactName={contactKey}
          contactValue={value}
          editMode={props.editMode}
        />
      );
    });

  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        {/*<PurpleButton text={'Save'} small/>*/}
        <button>Save</button>
        {createField(
          Input,
          'aboutMe',
          'text',
          [],
          'About me',
          'aboutMe',
          'You can write something about yourself if you want...',
        )}
        {createField(Input, 'fullName', 'text', [], 'Full name', 'fullName', 'Full Name')}
        {createField(
          Input,
          'lookingForAJob',
          'checkbox',
          [],
          'Looking for a job',
          'lookingForAJob',
          'Looking for a job',
        )}
        {createField(
          Input,
          'lookingForAJobDescription',
          'text',
          [],
          'Looking for a job description',
          'lookingForAJobDescription',
          'Looking for a job description',
        )}
        {contacts}
      </form>
    </div>
  );
};

export type FormDataType = {
  aboutMe: string | null;
  contacts: UserContactsType;
  fullName: string | null;
  lookingForAJob: boolean;
  lookingForAJobDescription: string | null;
};

export default reduxForm<FormDataType, ProfileContactsEditFormPropsType>({
  form: 'profileEditForm',
})(ProfileContactsEditForm);

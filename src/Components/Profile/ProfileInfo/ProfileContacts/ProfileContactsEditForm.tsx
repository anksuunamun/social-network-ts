import React from 'react';
import {createField, Input} from '../../../Common/FieldControls/FieldControls';
import {reduxForm} from 'redux-form';

type ProfileContactsEditFormPropsType = {}

const ProfileContactsEditForm: React.FC<ProfileContactsEditFormPropsType> = (props) => {
    return (
        <div>
            <form>
                {createField(Input, 'aboutMe', 'text', [], 'About me', 'aboutMe', 'You can write something about yourself if you want...')}
                {createField(Input, 'fullName')}
            </form>
        </div>
    )
}

type FormDataType = {
    aboutMe: string
}

export default reduxForm<FormDataType>({form: 'profileEditForm'})(ProfileContactsEditForm);
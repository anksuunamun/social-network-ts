import {Field, Form, Formik} from 'formik';
import React from 'react';
import styles from './UsersSearchForm.module.css';
import PurpleButton from '../../Common/PurpleButton/PurpleButton';

type UsersSearchFormPropsType = {
    onFilterChanged: (term: string, friend: boolean | null) => void
}


const UsersSearchForm: React.FC<UsersSearchFormPropsType> = (props) => {
    type SearchFormPropsType = {
        term: string
        friend: boolean | null
    }

    const onSearchFormSubmitHandler = (values: SearchFormPropsType, {setSubmitting}: any) => {
        props.onFilterChanged(values.term, values.friend);
        console.log(values)
        setSubmitting(false);
    }

    return (
        <>
            <Formik initialValues={{term: '', friend: null}}
                    onSubmit={onSearchFormSubmitHandler}>
                {({isSubmitting}) => (
                    <Form className={styles.formWrapper}>
                        <Field type="text"
                               name="term"
                               className={styles.input}
                               placeholder={'Find by name...'}/>
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
                        <PurpleButton text={'Find'}
                                      disabled={isSubmitting}
                                      small/>
                    </Form>
                )}
            </Formik>
        </>)
}

export default UsersSearchForm;


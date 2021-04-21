import {Field, Form, Formik} from 'formik';
import React from 'react';

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
                    <Form>
                        <Field type="text" name="term"/>
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </>)
}

export default UsersSearchForm;


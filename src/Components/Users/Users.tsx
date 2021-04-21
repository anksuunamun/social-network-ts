import React from 'react';
import styles from './Users.module.css';
import {UsersPropsType} from './UsersContainer';
import Paginator from '../Common/Paginator/Paginator';
import Preloader from '../Common/Preloader/Preloader';
import User from './User/User';
import {Form, Formik, Field} from 'formik';


function Users(props: UsersPropsType) {

    const users = props.users.map(user => {
        return <User user={user}
                     onFollow={props.onFollow}
                     onUnfollow={props.onUnfollow}
                     disabledButtons={props.disabledButtons}
                     key={user.id}/>
    })


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
            <div className={styles.usersWrapper + ' contentWrapper'}>
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
                <Paginator totalCount={props.totalCount}
                           currentPage={props.currentPage}
                           portionSize={props.portionSize}
                           pagesPortionSize={10}
                           onPageClickHandler={props.onPageClickHandler}
                           className={styles.paginator}
                />

                {props.isLoading
                    ? <Preloader/>
                    : <div className={styles.usersBlockWrapper}>{users}</div>
                }
            </div>
        </>
    )
}

export default Users;
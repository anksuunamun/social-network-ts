import React from 'react';
import styles from './PurpleButton.module.css';

type PurpleButtonPropsType = {
    text: string
    onButtonClick: () => void
}

const PurpleButton: React.FC<PurpleButtonPropsType> = (props: PurpleButtonPropsType) => {
    return (
        <>
            <button className={styles.authButtonWrapper} onClick={props.onButtonClick}>{props.text}</button>
        </>
    )
}

export default PurpleButton;
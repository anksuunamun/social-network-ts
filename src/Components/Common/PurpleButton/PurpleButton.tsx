import React from 'react';
import styles from './PurpleButton.module.css';

type PurpleButtonPropsType = {
    text: string
    onButtonClick: () => void
    small?: boolean
}

const PurpleButton: React.FC<PurpleButtonPropsType> = (props: PurpleButtonPropsType) => {
    return (
        <>
            <button className={`${styles.buttonWrapper} ${props.small ? styles.small : ''}`}
                    onClick={props.onButtonClick}>{props.text}</button>
        </>
    )
}

export default PurpleButton;
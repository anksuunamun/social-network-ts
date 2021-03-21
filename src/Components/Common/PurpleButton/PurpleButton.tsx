import React from 'react';
import styles from './PurpleButton.module.css';

type PurpleButtonPropsType = {
    text: string
    onButtonClick: () => void
    small?: boolean
    className?: string
    disabled?: boolean
}

const PurpleButton: React.FC<PurpleButtonPropsType> = (props: PurpleButtonPropsType) => {
    return (
        <>
            <button className={`${styles.buttonWrapper} ${props.small ? styles.small : ''} ${props.className}`}
                    onClick={props.onButtonClick} disabled={props.disabled}>{props.text}
            </button>
        </>
    )
}

export default PurpleButton;
import React from 'react';
import styles from './PurpleButton.module.css';
import {NavLink} from 'react-router-dom';

type PurpleButtonPropsType = {
    text: string
    onButtonClick?: () => void
    small?: boolean
    className?: string
    disabled?: boolean
    navLink?: string
}

const PurpleButton: React.FC<PurpleButtonPropsType> = (props: PurpleButtonPropsType) => {
    return (
        <>
            <button className={`${styles.buttonWrapper} ${props.small ? styles.small : ''} ${props.className}`}
                    onClick={props.onButtonClick}
                    disabled={props.disabled}>
                {props.navLink ? <NavLink to={props.navLink}>{props.text}</NavLink> : props.text}
            </button>
        </>
    )
}

export default PurpleButton;
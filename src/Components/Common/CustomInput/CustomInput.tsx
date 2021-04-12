import React, {ChangeEvent} from 'react';
import styles from './CustomInput.module.css';

export type CustomInputPropsType = {
    name: string
    id: string
    placeholder?: string
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    type?: string
    label?: string
}
const CustomInput: React.FC<CustomInputPropsType> = (props) => {
    return (<>
            <div><label htmlFor={props.id}>{props.label}</label></div>
            <input name={props.name}
                   id={props.id}
                   placeholder={props.placeholder ? props.placeholder : 'Write something here...'}
                   value={props.value}
                   onChange={props.onChange}
                   className={styles.input}
                   type={props.type}/>
        </>
    )
}

export default CustomInput;
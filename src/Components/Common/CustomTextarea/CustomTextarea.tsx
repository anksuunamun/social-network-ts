import React, {ChangeEvent} from 'react';
import styles from './CustomTextarea.module.css';

export type CustomTextareaPropsType = {
    name: string
    id: string
    cols?: number
    rows?: number
    placeholder?: string
    value: string
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}
const CustomTextarea: React.FC<CustomTextareaPropsType> = (props) => {
    return (
        <textarea name={props.name}
                  id={props.id}
                  cols={props.cols ? props.cols : 30}
                  rows={props.cols ? props.cols : 5}
                  placeholder={props.placeholder ? props.placeholder : 'Write something here...'}
                  value={props.value}
                  onChange={props.onChange}
                  className={styles.textarea}/>
    )
}

export default CustomTextarea;
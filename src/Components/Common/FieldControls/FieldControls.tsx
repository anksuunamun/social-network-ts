import React from 'react';


export const FieldControls: React.FC<any> = (props) => {
    return (
        <div>
            <div>
                <label htmlFor={props.id}>{props.label}</label>
            </div>
            {props.children}
            {props.meta.error && props.meta.touched ? <div>{props.meta.error}</div> : ''}
        </div>
    )
}

export const Input: React.FC<any> = (props) => {
    const {input, meta, ...restProps} = props;
    return (
        <FieldControls {...props}><input {...input} {...restProps}/></FieldControls>
    )
}
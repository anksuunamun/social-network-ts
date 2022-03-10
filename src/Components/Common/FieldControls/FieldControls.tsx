import React, { FC } from 'react';
import CustomTextarea, { CustomTextareaPropsType } from '../CustomTextarea/CustomTextarea';
import CustomInput, { CustomInputPropsType } from '../CustomInput/CustomInput';
import { Field, WrappedFieldProps } from 'redux-form';

type CustomComponentPropsType = CustomInputPropsType | CustomTextareaPropsType;
export const FieldControls: React.FC<WrappedFieldProps & CustomComponentPropsType> = (props) => {
  return (
    <div>
      {props.children}
      {props.meta.error && props.meta.touched ? <div>{props.meta.error}</div> : ''}
    </div>
  );
};

export const Input: React.FC<WrappedFieldProps & CustomInputPropsType> = (props) => {
  const { input, ...restProps } = props;
  return (
    <FieldControls {...props}>
      <CustomInput {...input} {...restProps} />
    </FieldControls>
  );
};

export const TextArea: React.FC<WrappedFieldProps & CustomTextareaPropsType> = (props) => {
  const { input, ...restProps } = props;
  return (
    <FieldControls {...props}>
      <CustomTextarea {...input} {...restProps} />
    </FieldControls>
  );
};

type ReceivedComponentType =
  | FC<WrappedFieldProps & CustomTextareaPropsType>
  | FC<WrappedFieldProps & CustomInputPropsType>
  | string;

export const createField = (
  component: ReceivedComponentType,
  name: string,
  type?: string,
  validate?: Array<Function>,
  label?: string,
  id?: string,
  placeholder?: string,
) => (
  <Field
    {...{
      component,
      type,
      name,
      validate,
      label,
      id,
      placeholder,
    }}
  />
);

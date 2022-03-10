export const maxLength = (maxLength: number) => {
  return (value: string) => {
    return value && value.length < maxLength
      ? undefined
      : `Length should be max ${maxLength} symbols!`;
  };
};

export const minLength = (minLength: number) => {
  return (value: string) => {
    return value && value.length >= minLength
      ? undefined
      : `Length should be min ${minLength} symbols!`;
  };
};

export const required = (value: string) => {
  return value ? undefined : 'Field is required!';
};

import { useField } from 'formik';
import React from 'react';

import { designTokens } from '../../designTokens';
import { DynamicTextInput } from './styled';

import { FormErrorMessage } from '..';

interface FormikInput {
  id: string;
  name: string;
  placeholder: string;
  type: string;
}

export const FormikInput = ({ id, name, placeholder, type }: FormikInput) => {
  const [field, meta, helpers] = useField({ name });
  const hasError = !!meta.error;

  return (
    <div>
      <DynamicTextInput
        error={meta.touched && hasError}
        id={id}
        name={field.name}
        onBlur={() => {
          helpers.setTouched(true);
        }}
        onChange={field.onChange}
        placeholder={placeholder}
        type={type}
        value={field.value}
      />
      {meta.touched && meta.error ? <FormErrorMessage color={designTokens.red}>{meta.error}</FormErrorMessage> : null}
    </div>
  );
};

import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';

export const RecordError = props => {
  const { errors, name } = props;

  const hasError = errors && errors.recordErrors && errors.recordErrors[name];

  return (
    <>
      {hasError && (
        <FormHelperText error={hasError}>
          {errors.recordErrors[name]}
        </FormHelperText>
      )}
    </>
  );
};

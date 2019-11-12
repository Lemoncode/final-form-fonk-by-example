import React from 'react';
import MaterialTextField from '@material-ui/core/TextField';
import { useStyles } from './text-field.component.styles';

export const TextField = props => {
  const { label, meta, fullWidth, ...rest } = props;
  const hasError = meta.error && meta.touched;
  const classes = useStyles();

  return (
    <MaterialTextField
      {...rest}
      className={classes.container}
      InputProps={{
        classes: {
          root: classes.input,
        },
      }}
      label={label}
      error={hasError}
      helperText={hasError ? meta.error : ''}
      fullWidth={fullWidth}
    />
  );
};

TextField.defaultProps = {
  fullWidth: true,
};

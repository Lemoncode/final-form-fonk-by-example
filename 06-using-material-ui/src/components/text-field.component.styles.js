import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  container: {
    marginTop: '0.5rem',
    '&:last-of-type': {
      marginLeft: '1rem',
    },
  },
  input: {
    height: '100%',
  },
});

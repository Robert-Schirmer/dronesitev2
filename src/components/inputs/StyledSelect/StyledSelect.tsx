import { TextField, TextFieldProps, styled } from '@mui/material';

const StyledSwitch = styled((props: TextFieldProps) => <TextField {...props} />)(({ theme }) => ({
  '& label': {
    color: theme.palette.text.light,
  },
  '&:hover label': {
    borderColor: theme.palette.secondary.main,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.text.light,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.secondary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.secondary.main,
    },
  },
  '& input, textarea': {
    color: theme.palette.text.light,
  },
}));

export default StyledSwitch;

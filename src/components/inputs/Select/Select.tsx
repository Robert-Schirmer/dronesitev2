import { FormControl, InputLabel, SelectProps, Select as MuiSelect } from '@mui/material';

interface Props extends SelectProps {
  label?: string;
}

const Select: React.FC<Props> = ({ label, children, ...selectProps }) => {
  return (
    <FormControl
      fullWidth
      color='secondary'
      sx={{
        '& label': {
          color: (theme) => theme.palette.text.primary,
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: (theme) => theme.palette.text.primary,
          },
          '&:hover fieldset': {
            borderColor: (theme) => theme.palette.secondary.main,
          },
          '& .MuiSelect-select': {
            color: (theme) => theme.palette.text.primary,
          },
        },
      }}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} {...selectProps}>
        {children}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;

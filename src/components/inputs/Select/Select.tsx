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
          color: (theme) => theme.palette.text.light,
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: (theme) => theme.palette.text.light,
          },
          '&:hover fieldset': {
            borderColor: (theme) => theme.palette.secondary.main,
          },
          '& .MuiSelect-select': {
            color: (theme) => theme.palette.text.light,
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

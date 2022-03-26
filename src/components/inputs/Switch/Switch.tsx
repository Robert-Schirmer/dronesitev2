import { FormControlLabel, FormGroup, SwitchProps, Switch as MuiSwitch } from '@mui/material';

interface Props extends SwitchProps {
  label?: string;
}

const Switch: React.FC<Props> = ({ label = '', ...switchProps }) => {
  return (
    <FormGroup>
      <FormControlLabel control={<MuiSwitch {...switchProps} />} label={label} />
    </FormGroup>
  );
};

export default Switch;

import { Box, Typography, TextField } from '@mui/material';
import { ChangeEvent, useCallback } from 'react';

type Value = string | number | null;

interface Props {
  value: Value;
  type?: 'string' | 'number' | 'password';
  onChange?: (newValue: Value) => void;
  label?: string;
  desc?: string;
  // Turn an empty string into null
  nullEmptyString?: boolean;
  multiline?: boolean;
}

const TextInput: React.FC<Props> = ({
  type = 'string',
  value,
  onChange,
  label,
  desc,
  nullEmptyString = false,
  multiline = false,
}) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      let parsedValue: string | number | null = event.target.value as string;
      if (type === 'number' || nullEmptyString) {
        // If empty string, convert to null
        if (!parsedValue) {
          parsedValue = null;
        } else if (type === 'number') {
          // If type is number convert to number
          parsedValue = parseFloat(parsedValue);
        }
      }
      onChange?.(parsedValue);
    },
    [type, onChange, nullEmptyString],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        sx={{ width: '100%' }}
        multiline={multiline}
        type={type}
        value={value ?? ''}
        onChange={handleChange}
        label={label}
      />
      {desc && (
        <Typography sx={{ marginTop: '5px !important' }} variant='caption'>
          {desc}
        </Typography>
      )}
    </Box>
  );
};

export default TextInput;

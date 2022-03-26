import { TextField } from '@mui/material';
import { Timestamp } from 'firebase-admin/firestore';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { convertTimestamp } from '../../../utils/functions';

interface Props {
  value: Date | Timestamp | null;
  onChange: (date: Date) => void;
  label?: string;
  id?: string;
}

const DateTimeSelector: React.FC<Props> = ({ value, onChange, id, label }) => {
  const [stringTime, setStringTime] = useState(value ? toStringTime(convertTimestamp(value)) : '');

  useEffect(() => {
    if (value === null) {
      setStringTime('');
    }
  }, [value]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setStringTime(event.target.value);
      onChange(new Date(event.target.value));
    },
    [onChange],
  );

  return (
    <TextField
      sx={{ width: '100%' }}
      id={id}
      label={label}
      type='datetime-local'
      value={stringTime}
      onChange={handleChange}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default DateTimeSelector;

/*
 * Convert date to string usable be datetime picker
 */
export const toStringTime = (date: Date) => {
  const [strDate, time] = date.toLocaleString('en-US', { hour12: false }).split(',');
  const [month, day, year] = strDate.split('/');
  const [hours, minutes] = time.split(':');

  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${
    hours.trim() == '24' ? '00' : hours.trim()
  }:${minutes}`;
};

import { Box, CircularProgress } from '@mui/material';
import { forwardRef } from 'react';

interface Props {
  id?: string;
  className?: string;
}

const size = 50;

const Loading: React.FC<Props> = forwardRef(({ id, className }, ref) => {
  return (
    <Box
      ref={ref}
      id={id}
      className={className}
      sx={{
        position: 'relative',
        height: `${size}px`,
        width: `${size}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '.circle-large': {
          position: 'absolute',
          top: 0,
          left: 0,
          circle: {
            strokeWidth: 2,
          },
        },
        '.circle-small': {
          circle: {
            strokeWidth: 4,
          },
        },
      }}
    >
      <CircularProgress size={size / 2} color='secondary' className='circle-small' />
      <CircularProgress size={size} color='primary' className='circle-large' />
    </Box>
  );
});

Loading.displayName = 'Loading';

export default Loading;

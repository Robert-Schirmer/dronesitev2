import { CircularProgress } from '@mui/material';
import { forwardRef } from 'react';

interface Props {}

const Loading: React.FC<Props> = forwardRef((_props, ref) => {
  return <CircularProgress size='30px' color='secondary' ref={ref} />;
});

Loading.displayName = 'Loading';

export default Loading;

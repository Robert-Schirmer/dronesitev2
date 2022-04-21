import { Stack } from '@mui/material';
import Loading from 'components/Loading';

// Takes up whole screen
const LoadingScreen: React.FC = () => {
  return (
    <Stack
      sx={{ height: '100vh', width: '100vw', backgroundColor: 'background.content' }}
      alignItems='center'
      justifyContent='center'
      spacing={3}
    >
      <Loading />
    </Stack>
  );
};

export default LoadingScreen;

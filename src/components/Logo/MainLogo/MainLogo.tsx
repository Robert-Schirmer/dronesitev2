import { Typography, Box } from '@mui/material';

const MainLogo: React.FC = () => {
  return (
    <Box
      sx={{
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        h5: {
          background: (theme) =>
            `linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
      }}
    >
      <Typography variant='h5'>
        <b>Big Air Angles</b>
      </Typography>
    </Box>
  );
};

export default MainLogo;

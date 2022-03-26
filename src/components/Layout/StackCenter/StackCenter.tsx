import { Grid, Stack, SxProps } from '@mui/material';

interface Props {
  contentMaxWidth?: number;
  stackSpacing?: number;
  sx?: SxProps;
}

const StackCenter: React.FC<Props> = ({ children, contentMaxWidth = 1000, stackSpacing = 4, sx }) => {
  return (
    <Grid container justifyContent='center' sx={{ padding: '0px 20px' }}>
      <Stack
        spacing={stackSpacing}
        sx={{
          maxWidth: `${contentMaxWidth}px`,
          width: `100vw`,
          marginTop: '50px',
          ...sx,
        }}
      >
        {children}
      </Stack>
    </Grid>
  );
};

export default StackCenter;

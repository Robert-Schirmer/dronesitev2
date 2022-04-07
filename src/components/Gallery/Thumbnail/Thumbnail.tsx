import { Box } from '@mui/material';

interface Props {
  src: string;
  loadingSrc: string;
  onClick: () => void;
}

const Thumbnail: React.FC<Props> = ({ src, onClick, loadingSrc, children }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        margin: '20px',
        img: (theme) => ({
          boxShadow: theme.boxShadow,
          borderRadius: theme.borderRadius,
          width: '300px',
          background: `url(${loadingSrc}) no-repeat`,
          backgroundSize: 'contain',
          '&:hover': {
            cursor: 'pointer',
          },
        }),
      }}
    >
      <img loading='lazy' src={src} alt='Gallery image' onClick={onClick} />
      {children}
    </Box>
  );
};

export default Thumbnail;

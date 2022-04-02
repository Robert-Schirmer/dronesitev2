import { Box } from '@mui/material';

interface Props {
  src: string;
  loadingSrc: string;
  onClick: () => void;
}

const GalleryImage: React.FC<Props> = ({ src, onClick, loadingSrc }) => {
  return (
    <Box
      sx={{
        img: (theme) => ({
          margin: '20px',
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
    </Box>
  );
};

export default GalleryImage;

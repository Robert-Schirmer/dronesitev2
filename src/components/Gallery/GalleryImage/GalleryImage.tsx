import { Box } from '@mui/material';

interface Props {
  src: string;
  onClick: () => void;
}

const GalleryImage: React.FC<Props> = ({ src, onClick }) => {
  return (
    <Box
      sx={{
        img: {
          boxShadow: (theme) => theme.boxShadow,
          borderRadius: (theme) => theme.borderRadius,
          width: '300px',
          '&:hover': {
            cursor: 'pointer',
          },
        },
      }}
    >
      <img src={src} alt='Gallery image' onClick={onClick} />
    </Box>
  );
};

export default GalleryImage;

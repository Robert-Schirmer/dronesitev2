import { Box } from '@mui/material';
import type { PhotoMeta } from '../../../utils/models/DocInterfaces';
import PhotoMetaTooltip from '../PhotoMetaTooltip';

interface Props {
  src: string;
  loadingSrc: string;
  photoMeta: PhotoMeta[];
  onClick: () => void;
}

const Thumbnail: React.FC<Props> = ({ src, onClick, loadingSrc, photoMeta }) => {
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
      <PhotoMetaTooltip photoMeta={photoMeta} waitForImageLoad={loadingSrc} />
    </Box>
  );
};

export default Thumbnail;

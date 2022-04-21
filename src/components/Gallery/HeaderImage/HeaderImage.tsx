import { Box } from '@mui/material';
import type { PhotoMeta } from 'utils/models/DocInterfaces';
import PhotoMetaTooltip from '../PhotoMetaTooltip';

interface Props {
  srcSet: string;
  loadingSrc: string;
  photoMeta: PhotoMeta[];
  onClick: () => void;
}

const HeaderImage: React.FC<Props> = ({ srcSet, onClick, loadingSrc, photoMeta }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        img: (theme) => ({
          boxShadow: theme.boxShadow,
          borderRadius: theme.borderRadius,
          width: '90vw',
          maxWidth: '1000px',
          background: `url(${loadingSrc}) no-repeat`,
          backgroundSize: 'contain',
          '&:hover': {
            cursor: 'pointer',
          },
        }),
      }}
    >
      <img srcSet={srcSet} alt='Header image' onClick={onClick} />
      <PhotoMetaTooltip photoMeta={photoMeta} waitForImageLoad={loadingSrc} />
    </Box>
  );
};

export default HeaderImage;

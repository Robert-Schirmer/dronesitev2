import { Box } from '@mui/material';
import { useMemo } from 'react';
import type { ImageDoc } from '../../../utils/models/DocInterfaces';
import { createImagePath, createSrcSet } from '../utils';

interface Props {
  image: ImageDoc;
}

const HeaderImage: React.FC<Props> = ({ image }) => {
  const { srcSet, loadingSrc } = useMemo(
    () => ({
      srcSet: createSrcSet(image.src),
      loadingSrc: createImagePath(image.src, 300),
    }),
    [image.src],
  );

  return (
    <Box
      sx={{
        img: (theme) => ({
          boxShadow: theme.boxShadow,
          borderRadius: theme.borderRadius,
          width: '90vw',
          maxWidth: '1000px',
          background: `url(${loadingSrc}) no-repeat`,
          backgroundSize: 'contain',
        }),
      }}
    >
      <img srcSet={srcSet} alt='Header image' />
    </Box>
  );
};

export default HeaderImage;

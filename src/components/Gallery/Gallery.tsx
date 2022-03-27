import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import GalleryImage from './GalleryImage';
import Modal from './GalleryImage/Modal';
import { createImagePath, createSrcSet } from './utils';
import ContentContainer from '../ContentContainer';

const Gallery: React.FC = () => {
  const [imgs, setImgs] = useState<string[]>([]);
  const [modalVisibleIndex, setModalVisibleIndex] = useState<number | false>(false);

  useEffect(() => {
    setImgs(['DJI_0003.jpg', 'DJI_0004.jpg', 'DJI_0016.jpg', 'DJI_0018.jpg']);
  }, []);

  return (
    <ContentContainer container spacing={7} justifyContent='center'>
      {imgs.map((img, index) => {
        const src = createImagePath(img, 300);
        const srcSet = createSrcSet(img);

        return (
          <Grid item key={img}>
            <GalleryImage src={src} onClick={() => setModalVisibleIndex(index)} />
            <Modal
              srcSet={srcSet}
              visible={index === modalVisibleIndex}
              loadingSrc={src}
              onClose={() => setModalVisibleIndex(false)}
            />
          </Grid>
        );
      })}
    </ContentContainer>
  );
};

export default Gallery;

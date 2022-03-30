import { Grid } from '@mui/material';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore/lite';
import { useEffect, useState } from 'react';
import GalleryImage from './GalleryImage';
import Modal from './GalleryImage/Modal';
import { createImagePath, createSrcSet } from './utils';
import type { ImageDoc } from '../../utils/models/DocInterfaces';
import { fromFirestore } from '../../utils/models/ModelUtils';
import ContentContainer from '../ContentContainer';
import Loading from '../Loading';

const Gallery: React.FC = () => {
  const [imgs, setImgs] = useState<ImageDoc[]>([]);
  const [modalVisibleIndex, setModalVisibleIndex] = useState<number | false>(false);

  useEffect(() => {
    (async () => {
      const db = getFirestore();
      const snap = await getDocs(query(collection(db, 'images')));
      const images = snap.docs.map((doc) => fromFirestore<ImageDoc>(doc));
      setImgs(images);
    })().catch(console.error);
  }, []);

  return (
    <ContentContainer container spacing={7} justifyContent='center'>
      {imgs.length ? (
        imgs.map((img, index) => {
          const loadingSrc = createImagePath(img.src, 300);
          const gallerySrc = createImagePath(img.src, 600);
          const srcSet = createSrcSet(img.src);

          return (
            <Grid item key={img.docRef.id}>
              <GalleryImage src={gallerySrc} loadingSrc={loadingSrc} onClick={() => setModalVisibleIndex(index)} />
              <Modal
                srcSet={srcSet}
                visible={index === modalVisibleIndex}
                loadingSrc={loadingSrc}
                onClose={() => setModalVisibleIndex(false)}
              />
            </Grid>
          );
        })
      ) : (
        <Loading />
      )}
    </ContentContainer>
  );
};

export default Gallery;

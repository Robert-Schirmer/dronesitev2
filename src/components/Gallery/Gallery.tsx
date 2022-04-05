import { Grid } from '@mui/material';
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore/lite';
import { useCallback, useEffect, useState } from 'react';
import GalleryImage from './GalleryImage';
import type { ImageDoc } from '../../utils/models/DocInterfaces';
import { fromFirestore } from '../../utils/models/ModelUtils';
import ContentContainer from '../ContentContainer';
import Loading from '../Loading';

const Gallery: React.FC = () => {
  const [imgs, setImgs] = useState<ImageDoc[]>([]);
  const [headerImage, setHeaderImage] = useState<ImageDoc | null>(null);
  const [modalVisibleIndex, setModalVisibleIndex] = useState<number | false>(false);

  useEffect(() => {
    (async () => {
      const db = getFirestore();
      const snap = await getDocs(
        query(collection(db, 'images'), orderBy('headerImage', 'desc'), orderBy('posted', 'desc')),
      );
      const images = snap.docs.map((doc) => fromFirestore<ImageDoc>(doc));
      // First index will be a header image
      const [headerImg, ...otherImgs] = images;
      setHeaderImage(headerImg);
      setImgs(otherImgs);
    })().catch(console.error);
  }, []);

  const handleOnModalClose = useCallback(() => {
    setModalVisibleIndex(false);
  }, []);

  return (
    <>
      <Grid container justifyContent='center'>
        {headerImage ? (
          <GalleryImage
            header={true}
            image={headerImage}
            modalOpen={0 === modalVisibleIndex}
            onThumbnailClick={() => setModalVisibleIndex(0)}
            onModalClose={handleOnModalClose}
          />
        ) : (
          <Loading />
        )}
      </Grid>
      <ContentContainer container justifyContent='center' alignItems='center'>
        {imgs.length ? (
          imgs.map((img, index) => (
            <GalleryImage
              key={img.docRef.id}
              image={img}
              modalOpen={index + 1 === modalVisibleIndex}
              onThumbnailClick={() => setModalVisibleIndex(index + 1)}
              onModalClose={handleOnModalClose}
            />
          ))
        ) : (
          <Loading />
        )}
      </ContentContainer>
    </>
  );
};

export default Gallery;

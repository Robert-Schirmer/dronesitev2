import { Grid } from '@mui/material';
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore/lite';
import { useEffect, useState } from 'react';
import GalleryImage from './GalleryImage';
import GalleryImages from './GalleryImages';
import type { ImageDoc } from '../../utils/models/DocInterfaces';
import { fromFirestore } from '../../utils/models/ModelUtils';
import ContentContainer from '../ContentContainer';
import Loading from '../Loading';

const Gallery: React.FC = () => {
  const [headerImage, setHeaderImage] = useState<ImageDoc | null>(null);
  const [galleryImages, seetGalleryImages] = useState<ImageDoc[] | null>(null);

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
      seetGalleryImages(otherImgs);
    })().catch(console.error);
  }, []);

  return (
    <>
      <Grid container justifyContent='center'>
        {headerImage ? <GalleryImage header={true} image={headerImage} /> : <Loading />}
      </Grid>
      <ContentContainer container justifyContent='center' alignItems='center'>
        {galleryImages ? <GalleryImages imgs={galleryImages} /> : <Loading />}
      </ContentContainer>
    </>
  );
};

export default Gallery;

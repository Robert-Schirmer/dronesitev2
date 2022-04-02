import { Grid } from '@mui/material';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore/lite';
import { useEffect, useMemo, useState } from 'react';
import GalleryImage from './GalleryImage';
import HeaderImage from './HeaderImage';
import Modal from './Modal';
import { createImagePath, createSrcSet } from './utils';
import { getRandomFromArray } from '../../utils/functions';
import type { ImageDoc } from '../../utils/models/DocInterfaces';
import { fromFirestore } from '../../utils/models/ModelUtils';
import ContentContainer from '../ContentContainer';
import Loading from '../Loading';

const Gallery: React.FC = () => {
  const [imgs, setImgs] = useState<ImageDoc[]>([]);
  const [headerImage, setHeaderImage] = useState<ImageDoc | null>(null);
  const [modalVisibleIndex, setModalVisibleIndex] = useState<number | false>(false);
  const { hLoadingSrc, hSrcSet } = useMemo(() => {
    if (!headerImage) {
      return {
        hLoadingSrc: null,
        hSrcSet: null,
      };
    }
    return {
      hLoadingSrc: createImagePath(headerImage.src, 300),
      hSrcSet: createSrcSet(headerImage.src),
    };
  }, [headerImage]);

  useEffect(() => {
    (async () => {
      const db = getFirestore();
      const snap = await getDocs(query(collection(db, 'images')));
      const images = snap.docs.map((doc) => fromFirestore<ImageDoc>(doc));
      const { randomIndex } = getRandomFromArray(images);
      const [random] = images.splice(randomIndex, 1);
      setHeaderImage(random);
      setImgs(images);
    })().catch(console.error);
  }, []);

  return (
    <>
      {hSrcSet && hLoadingSrc && (
        <Grid container justifyContent='center'>
          <HeaderImage srcSet={hSrcSet} loadingSrc={hLoadingSrc} onClick={() => setModalVisibleIndex(0)} />
          <Modal
            srcSet={hSrcSet}
            visible={0 === modalVisibleIndex}
            loadingSrc={hLoadingSrc}
            onClose={() => setModalVisibleIndex(false)}
          />
        </Grid>
      )}
      {imgs.length ? (
        <ContentContainer container justifyContent='center'>
          {imgs.map((img, index) => {
            const loadingSrc = createImagePath(img.src, 300);
            const gallerySrc = createImagePath(img.src, 600);
            const srcSet = createSrcSet(img.src);
            // First index is header image
            const imgIndex = index + 1;

            return (
              <Grid item key={img.docRef.id}>
                <GalleryImage src={gallerySrc} loadingSrc={loadingSrc} onClick={() => setModalVisibleIndex(imgIndex)} />
                <Modal
                  srcSet={srcSet}
                  visible={imgIndex === modalVisibleIndex}
                  loadingSrc={loadingSrc}
                  onClose={() => setModalVisibleIndex(false)}
                />
              </Grid>
            );
          })}
        </ContentContainer>
      ) : (
        <Grid container justifyContent='center'>
          <Loading />
        </Grid>
      )}
    </>
  );
};

export default Gallery;

import { Button, Grid, Typography } from '@mui/material';
import { addDoc, collection, DocumentData, getFirestore, QueryDocumentSnapshot, updateDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { ImageDoc } from '../../../utils/models/DocInterfaces';
import { fromFirestore } from '../../../utils/models/ModelUtils';
import ContentContainer from '../../ContentContainer';
import TextInput from '../../inputs/TextInput';

interface Props {
  doc: 'new' | QueryDocumentSnapshot<DocumentData>;
  onClose?: () => void;
}

type Image = Omit<ImageDoc, 'docRef'>;

const ImageEdit: React.FC<Props> = ({ doc, onClose }) => {
  const [image, setImage] = useState<Image | ImageDoc | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (doc === 'new') {
      setImage({
        src: '',
        meta: [],
      });
    } else {
      const data = fromFirestore<ImageDoc>(doc);
      setImage(data);
    }
  }, [doc]);

  const setValue = useCallback((field: string, newValue) => {
    setImage((prev) => ({ ...prev!, [field]: newValue }));
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!image!.src) {
        throw 'No source set';
      }
      if (doc === 'new') {
        const db = getFirestore();
        // New document
        await addDoc(collection(db, 'images'), image);
        // Document saved
        onClose?.();
      } else {
        const { docRef, ...data } = image as ImageDoc;
        // TODO: Known typescript issue with firebase v9
        // https://github.com/firebase/firebase-js-sdk/issues/5853
        // @ts-ignore
        await updateDoc(docRef, data);
      }
    } catch (error) {
      if (typeof error === 'string') {
        // Validation error
        setMessage(error);
      } else {
        setMessage('Error saving');
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentContainer
      sx={{
        minWidth: 500,
      }}
      container
      flexDirection='row'
      spacing={3}
    >
      {image && (
        <>
          <Grid item xs={6}>
            <TextInput label='Source' value={image.src} onChange={(newValue) => setValue('src', newValue)} />
          </Grid>
          <Grid item container xs={6} spacing={2}>
            {image.meta.map((meta, index) => {
              return (
                <Grid item key={index} container spacing={2}>
                  <Grid item xs={5}>
                    <TextInput
                      label='Label'
                      value={meta.label}
                      onChange={(newValue) =>
                        setImage((prev) => {
                          prev!.meta[index].label = newValue as string;
                          return { ...prev, meta: [...prev!.meta] } as Image;
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextInput
                      label='Value'
                      value={meta.value}
                      onChange={(newValue) =>
                        setImage((prev) => {
                          prev!.meta[index].value = newValue as string;
                          return { ...prev, meta: [...prev!.meta] } as Image;
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      onClick={() =>
                        setImage((prev) => {
                          prev!.meta.splice(index, 1);
                          return { ...prev, meta: [...prev!.meta] } as Image;
                        })
                      }
                    >
                      X
                    </Button>
                  </Grid>
                </Grid>
              );
            })}
            <Grid item container justifyContent='center' spacing={2}>
              <Grid item>
                <Button
                  onClick={() =>
                    setImage((prev) => ({ ...prev, meta: [...prev!.meta, { label: '', value: '' }] } as Image))
                  }
                >
                  Add meta
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => setImage((prev) => ({ ...prev, meta: [...prev!.meta, ...defaultMeta] } as Image))}
                >
                  Add default meta
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
      <Grid item container justifyContent='center'>
        <Button disabled={loading} onClick={handleSubmit}>
          Save
        </Button>
      </Grid>
      {message && (
        <Grid item xs={12}>
          <Typography variant='body1'>{message}</Typography>
        </Grid>
      )}
    </ContentContainer>
  );
};

const defaultMeta = [
  { label: 'Location', value: '' },
  { label: 'Time', value: '' },
  { label: 'Elevation', value: '' },
];

export default ImageEdit;

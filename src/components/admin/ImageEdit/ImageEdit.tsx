import { Button, Grid, Typography } from '@mui/material';
import { addDoc, collection, DocumentData, getFirestore, QueryDocumentSnapshot, updateDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import type { ImageDoc, PhotoMeta } from '../../../utils/models/DocInterfaces';
import { fromFirestore } from '../../../utils/models/ModelUtils';
import ContentContainer from '../../ContentContainer';
import GalleryImage from '../../Gallery/GalleryImage';
import type { Image } from '../../Gallery/types';
import Switch from '../../inputs/Switch';
import TextInput from '../../inputs/TextInput';

interface Props {
  doc: 'new' | QueryDocumentSnapshot<DocumentData>;
  onClose?: () => void;
}

const ImageEdit: React.FC<Props> = ({ doc, onClose }) => {
  const [image, setImage] = useState<Image | ImageDoc | null>(null);
  const [saved, setSaved] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (doc === 'new') {
      setImage({
        src: '',
        headerImage: false,
        meta: [],
        posted: new Date(),
      });
    } else {
      const data = fromFirestore<ImageDoc>(doc);
      setImage(data);
    }
  }, [doc]);

  const onFieldUpdate = useCallback(() => {
    setSaved(false);
  }, []);

  const setValue = useCallback(
    (field: keyof Image, newValue) => {
      onFieldUpdate();
      setImage((prev) => ({ ...prev!, [field]: newValue }));
    },
    [onFieldUpdate],
  );

  const setArrayFieldValue = useCallback(
    (parentField: 'meta', index: number, field: keyof PhotoMeta, newValue: string) => {
      onFieldUpdate();
      setImage((prev) => {
        prev![parentField][index][field] = newValue;
        return { ...prev, meta: [...prev!.meta] } as Image;
      });
    },
    [onFieldUpdate],
  );

  const addToArrayField = useCallback(
    (parentField: 'meta', ...newValues: PhotoMeta[]) => {
      onFieldUpdate();
      setImage((prev) => {
        return { ...prev, [parentField]: [...prev![parentField], ...newValues] } as Image;
      });
    },
    [onFieldUpdate],
  );

  const deleteFromArrayField = useCallback(
    (parentField: 'meta', index: number) => {
      onFieldUpdate();
      setImage((prev) => {
        prev![parentField].splice(index, 1);
        return { ...prev, meta: [...prev!.meta] } as Image;
      });
    },
    [onFieldUpdate],
  );

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!image) {
        throw 'Image does not exist';
      }
      if (!image.src) {
        throw 'No source set';
      }
      if (doc === 'new') {
        const db = getFirestore();
        image.posted = new Date();
        // New document
        await addDoc(collection(db, 'images'), image);
        setSaved(true);
        // Document saved
        onClose?.();
      } else {
        const { docRef, ...data } = image as ImageDoc;
        // TODO: Known typescript issue with firebase v9
        // https://github.com/firebase/firebase-js-sdk/issues/5853
        // @ts-ignore
        await updateDoc(docRef, data);
        setSaved(true);
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
        padding: '20px',
      }}
      container
      flexDirection='row'
      spacing={3}
    >
      {image && (
        <>
          <Grid container justifyContent='center'>
            {image && image.src && <GalleryImage image={image} />}
          </Grid>
          <Grid item xs={6}>
            <TextInput label='Source' value={image.src} onChange={(newValue) => setValue('src', newValue)} />
            <Switch
              label='Header image'
              checked={image.headerImage}
              onChange={(event) => setValue('headerImage', event.target.checked)}
            />
          </Grid>
          <Grid item container xs={6} spacing={2}>
            {image.meta.map((meta, index) => {
              return (
                <Grid item key={index} container spacing={2}>
                  <Grid item xs={5}>
                    <TextInput
                      label='Label'
                      value={meta.label}
                      onChange={(newValue) => setArrayFieldValue('meta', index, 'label', newValue as string)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextInput
                      label='Value'
                      value={meta.value}
                      onChange={(newValue) => setArrayFieldValue('meta', index, 'value', newValue as string)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button onClick={() => deleteFromArrayField('meta', index)}>X</Button>
                  </Grid>
                </Grid>
              );
            })}
            <Grid item container justifyContent='center' spacing={2}>
              <Grid item>
                <Button onClick={() => addToArrayField('meta', { label: '', value: '' })}>Add meta</Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() =>
                    addToArrayField(
                      'meta',
                      { label: 'Location', value: '' },
                      { label: 'Time', value: '' },
                      { label: 'Elevation', value: '' },
                    )
                  }
                >
                  Add default meta
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
      <Grid item container justifyContent='center'>
        <Button disabled={loading || saved} onClick={handleSubmit}>
          {saved ? 'Saved' : 'Save'}
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

export default ImageEdit;

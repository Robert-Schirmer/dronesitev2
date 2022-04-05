import { Box, Button, Grid, Modal } from '@mui/material';
import {
  collection,
  getFirestore,
  onSnapshot,
  DocumentData,
  QueryDocumentSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import ImageEdit from '../../src/components/admin/ImageEdit';
import Layout from '../../src/components/Layout';
import StackCenter from '../../src/components/Layout/StackCenter';
import usePageRoles from '../../src/utils/hooks/usePageRoles';
import { Role } from '../../src/utils/models/DocInterfaces';

const Admin: NextPage = () => {
  usePageRoles(Role.ADMIN);
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [docs, setDocs] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

  useEffect(() => {
    const db = getFirestore();
    const unsub = onSnapshot(
      query(collection(db, 'images'), orderBy('headerImage', 'desc'), orderBy('posted', 'desc')),
      (snap) => {
        setDocs((prevDocs) => {
          if (prevDocs.length === 0) {
            return snap.docs;
          }
          const newDocs: typeof docs = [];
          snap.docChanges().forEach((docChange) => {
            if (docChange.type === 'added') {
              newDocs.push(docChange.doc);
            }
          });
          return [...prevDocs, ...newDocs];
        });
      },
    );
    return unsub;
  }, []);

  return (
    <Layout>
      <StackCenter stackSpacing={8}>
        <Grid container justifyContent='center'>
          <Button onClick={() => setNewModalOpen(true)}>New image +</Button>
        </Grid>
        {docs.map((doc) => (
          <Box
            key={doc.id}
            sx={{
              border: (theme) => `2px solid ${theme.palette.secondary.main}`,
              borderRadius: (theme) => theme.borderRadius,
              padding: '30px',
            }}
          >
            <ImageEdit doc={doc} />
          </Box>
        ))}
      </StackCenter>
      <Modal
        open={newModalOpen}
        onClose={() => setNewModalOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box
          sx={{
            padding: '30px',
            borderRadius: (theme) => theme.borderRadius,
            boxShadow: (theme) => theme.boxShadow,
            backgroundColor: (theme) => theme.palette.background.content,
          }}
        >
          <ImageEdit doc='new' onClose={() => setNewModalOpen(false)} />
        </Box>
      </Modal>
    </Layout>
  );
};

export default Admin;

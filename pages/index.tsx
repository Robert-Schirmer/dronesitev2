import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import ContentContainer from '../src/components/ContentContainer';
import Layout from '../src/components/Layout';
import StackCenter from '../src/components/Layout/StackCenter';
import type { TestDoc } from '../src/utils/models/DocInterfaces';
import { getDocFromFirestore } from '../src/utils/models/ModelUtils';

const Home: NextPage = () => {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    (async () => {
      const docData = await getDocFromFirestore<TestDoc>('siteconfigs/test');
      setMsg(docData.msg);
    })().catch(console.error);
  }, []);

  return (
    <Layout>
      <StackCenter contentMaxWidth={800} stackSpacing={12}>
        <ContentContainer>
          <Typography>{msg}</Typography>
        </ContentContainer>
      </StackCenter>
    </Layout>
  );
};

export default Home;

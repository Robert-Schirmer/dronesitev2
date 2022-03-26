import { Typography } from '@mui/material';
import { NextPage } from 'next';
import ContentContainer from '../src/components/ContentContainer';
import Layout from '../src/components/Layout';
import StackCenter from '../src/components/Layout/StackCenter';

const PageNotFound: NextPage = () => {
  return (
    <Layout>
      <StackCenter>
        <ContentContainer>
          <Typography variant='h6'>Oops, page could not be found</Typography>
        </ContentContainer>
      </StackCenter>
    </Layout>
  );
};

export default PageNotFound;

import type { NextPage } from 'next';
import Gallery from 'components/Gallery';
import Layout from 'components/Layout';
import StackCenter from 'components/Layout/StackCenter';

const Home: NextPage = () => {
  return (
    <Layout>
      <StackCenter contentMaxWidth={2000} stackSpacing={12}>
        <Gallery />
      </StackCenter>
    </Layout>
  );
};

export default Home;

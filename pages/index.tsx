import type { NextPage } from 'next';
import Gallery from '../src/components/Gallery';
import Layout from '../src/components/Layout';
import StackCenter from '../src/components/Layout/StackCenter';

const Home: NextPage = () => {
  return (
    <Layout>
      <StackCenter contentMaxWidth={1400} stackSpacing={12}>
        <Gallery />
      </StackCenter>
    </Layout>
  );
};

export default Home;

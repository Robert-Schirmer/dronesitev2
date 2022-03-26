import Head from 'next/head';
import { useRouter } from 'next/router';
import { pages } from '../Pages';

const AppHead: React.FC = () => {
  const router = useRouter();

  return (
    <Head>
      <title>{pages[router.asPath] ? pages[router.asPath].title : 'matūki'}</title>
      <meta
        name='description'
        content={pages[router.asPath] ? pages[router.asPath].desc : 'Launch you NFT with confidence'}
      />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
};

export default AppHead;

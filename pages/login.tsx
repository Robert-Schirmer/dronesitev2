import { Button, Grid, Stack, Typography } from '@mui/material';
import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { FormEvent, useState } from 'react';
import pack from '../package.json';
import ContentContainer from '../src/components/ContentContainer';
import TextInput from '../src/components/inputs/TextInput';
import Layout from '../src/components/Layout';
import Loading from '../src/components/Loading';
import MainLogo from '../src/components/Logo/MainLogo';

const Login: NextPage = () => {
  const [pass, setPass] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      cache: 'no-cache',
      body: pass,
    });
    switch (response.status) {
      case 200:
        // Accepted
        router.push('/');
        break;
      case 401:
        // Unaccepted
        setMessage('Unauthorized');
        setLoading(false);
        break;
      default:
        console.error(`Unexpected response for auth endpoint status ${response.status}`);
        setMessage('Unauthorized');
        break;
    }
  };

  return (
    <Layout footer={false} navigation={false}>
      <Grid container justifyContent='center'>
        <ContentContainer container sx={{ width: '300px', gap: '50px' }} flexDirection='column'>
          <MainLogo />
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} alignItems='center'>
              {loading ? (
                <Loading />
              ) : (
                <>
                  <TextInput
                    type='password'
                    label='Password'
                    value={pass}
                    onChange={(newValue) => setPass(newValue as string)}
                  />
                  {message && <Typography variant='body1'>{message}</Typography>}
                  <Button type='submit'>Submit</Button>
                </>
              )}
              <Typography variant='caption'>v{pack.version}</Typography>
            </Stack>
          </form>
        </ContentContainer>
      </Grid>
    </Layout>
  );
};

export default Login;

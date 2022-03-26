import { Button, Grid, Stack, Typography } from '@mui/material';
import type { NextPage } from 'next';
import { useCallback } from 'react';
import ContentContainer from '../../src/components/ContentContainer';
import Layout from '../../src/components/Layout';
import Loading from '../../src/components/Loading';
import MainLogo from '../../src/components/Logo/MainLogo';
import useUserAuth from '../../src/contexts/UserAuthContext/useUserAuth';

const Login: NextPage = () => {
  const { googleSignIn, loading, signOut, user } = useUserAuth();

  const handleGoogleSignIn = useCallback(async () => {
    try {
      await googleSignIn();
    } catch (error) {
      // Handle error signing in
    }
  }, [googleSignIn]);

  return (
    <Layout>
      <Grid container justifyContent='center'>
        <ContentContainer
          container
          alignItems='center'
          sx={{ maxWidth: '250px', gap: '40px', margin: '20px' }}
          flexDirection='column'
        >
          <MainLogo />
          {loading ? (
            <Loading />
          ) : (
            <Stack spacing={2}>
              {user ? <Button onClick={signOut}>Sign out</Button> : <Button onClick={handleGoogleSignIn}>Login</Button>}
              <Typography variant='caption' align='center'>
                <i>Authentication is provided through Google Services</i>
              </Typography>
            </Stack>
          )}
        </ContentContainer>
      </Grid>
    </Layout>
  );
};

export default Login;

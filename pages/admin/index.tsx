import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import Layout from '../../src/components/Layout';
import StackCenter from '../../src/components/Layout/StackCenter';
import usePageRoles from '../../src/utils/hooks/usePageRoles';
import { Role } from '../../src/utils/models/DocInterfaces';

const Admin: NextPage = () => {
  usePageRoles(Role.ADMIN);

  return (
    <Layout>
      <StackCenter stackSpacing={8}>
        <Typography>Welcome to the admin page</Typography>
      </StackCenter>
    </Layout>
  );
};

export default Admin;

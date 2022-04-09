import { Box } from '@mui/material';
import type { PropsWithChildren } from 'react';
import Footer from './Footer';
import Navigation from './Navigation';
import ScrollTop from '../ScrollTop';

interface Props {
  navigation?: boolean;
  footer?: boolean;
  footerMargin?: number;
}

const Layout: React.FC<PropsWithChildren<Props>> = ({
  children,
  navigation = true,
  footer = true,
  footerMargin = 100,
}) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'background.default',
        '.page-header': {
          marginTop: '40px',
        },
      }}
    >
      <div>{navigation && <Navigation />}</div>
      {children}
      {footer ? <Footer topMargin={footerMargin} /> : <div />}
      <ScrollTop />
    </Box>
  );
};

export default Layout;

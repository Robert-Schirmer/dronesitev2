import { AppBar, Button, Drawer, Grid, Hidden, Stack, Switch, Toolbar } from '@mui/material';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import HamburgerIcon from 'assets/icons/svg/Hamburger';
import MoonIcon from 'assets/icons/svg/Moon';
import SunIcon from 'assets/icons/svg/Sun';
import MainLogo from 'components/Logo/MainLogo';
import useThemeMode from 'contexts/ThemeContext/useThemeMode';
import useUserAuth from 'contexts/UserAuthContext/useUserAuth';
import { Role } from 'utils/models/DocInterfaces';
import NavLink from '../NavLink';
import { navPages } from '../Pages';

interface NavProps {
  showLogo?: boolean;
  hover?: boolean;
  // Just show logo and theme switcher
  simple?: boolean;
}

const Navigation: React.FC<NavProps> = ({ showLogo = true, hover = true, simple = false }) => {
  return (
    <AppBar
      sx={{
        alignItems: 'center',
        backgroundColor: 'background.header',
        backgroundImage: 'none',
        boxShadow: 'none',
        zIndex: 2,
        padding: '8px',
        color: 'text.primary',
      }}
      position='static'
    >
      <Toolbar
        sx={{
          width: '100%',
          maxWidth: 1400,
          minHeight: '64px',
          borderRadius: (theme) => theme.borderRadius,
          boxShadow: hover ? (theme) => theme.boxShadow : undefined,
          backgroundColor: 'background.header',
        }}
      >
        {simple ? <SimpleNav /> : <Nav showLogo={showLogo} hover={hover} />}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;

const SimpleNav: React.FC = () => {
  return (
    <Grid container justifyContent='center' alignItems='center'>
      {/* Spacer */}
      <Grid item xs={4} />
      <Link href='/' passHref>
        <Grid item xs={4}>
          <MainLogo />
        </Grid>
      </Link>
      <Grid item container justifyContent='flex-end' xs={4}>
        <ThemeSwitch />
      </Grid>
    </Grid>
  );
};

const Nav: React.FC<NavProps> = ({ showLogo }) => {
  return (
    <Grid
      container
      sx={{
        flexDirection: {
          md: 'row',
          xs: 'row-reverse',
        },
      }}
    >
      <Grid
        sx={{
          justifyContent: {
            md: 'flex-start',
            xs: 'flex-end',
          },
          height: {
            md: '70px',
            xs: '60px',
          },
        }}
        item
        container
        xs={3}
        md={8}
        alignItems='center'
      >
        <Hidden mdDown>
          {showLogo && (
            <Link href='/' passHref>
              <Grid
                item
                sx={{
                  height: '100%',
                  width: '180px',
                  ':hover': {
                    cursor: 'pointer',
                  },
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <MainLogo />
              </Grid>
            </Link>
          )}
          <Grid item sx={{ paddingLeft: '20px' }}>
            <Stack direction='row' spacing={3}>
              {navPages.map((page) => (
                <NavLink key={page.href} label={page.label} href={page.href} />
              ))}
              <UserNavLinks />
            </Stack>
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <SmallScreenNav />
        </Hidden>
      </Grid>
      <Hidden mdUp>
        <Grid item container xs={9}>
          {showLogo && (
            <Link href='/' passHref>
              <Grid
                item
                sx={{
                  height: '100%',
                  width: '100%',
                  position: 'relative',
                  ':hover': {
                    cursor: 'pointer',
                  },
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <MainLogo />
              </Grid>
            </Link>
          )}
        </Grid>
      </Hidden>
      <Grid
        sx={{
          justifyContent: {
            md: 'flex-end',
            xs: 'flex-start',
          },
        }}
        item
        container
        alignItems='center'
        spacing={1}
        xs={0}
        md={4}
      >
        <Hidden mdDown>
          <Grid item>
            <ThemeSwitch />
          </Grid>
          <Grid item>
            <SignOutButton />
          </Grid>
        </Hidden>
      </Grid>
    </Grid>
  );
};

const ThemeSwitch: React.FC = () => {
  const { mode, setThemeMode } = useThemeMode();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setThemeMode(event.target.checked ? 'dark' : 'light');
  };

  return (
    <Switch
      checkedIcon={<MoonIcon sx={{ marginTop: '-3px' }} color='primary' />}
      icon={<SunIcon sx={{ marginTop: '-2px', marginLeft: '-3px' }} color='primary' />}
      checked={mode === 'dark'}
      onChange={handleChange}
    />
  );
};

const SmallScreenNav: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <HamburgerIcon
        onClick={() => setDrawerOpen(true)}
        sx={{
          height: 30,
          width: 30,
          '&:hover': {
            cursor: 'pointer',
          },
        }}
      />
      <Drawer
        anchor='left'
        sx={{
          '& .MuiDrawer-paper': {
            paddingLeft: '30px',
            backgroundColor: 'background.default',
          },
        }}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Link href='/' passHref>
          <Grid
            item
            sx={{
              height: '100px',
              width: '180px',
              position: 'relative',
              ':hover': {
                cursor: 'pointer',
              },
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <MainLogo />
          </Grid>
        </Link>
        <Stack spacing={3}>
          {navPages.map((page) => (
            <NavLink key={page.href} label={page.label} href={page.href} />
          ))}
          <ThemeSwitch />
        </Stack>
      </Drawer>
    </>
  );
};

const UserNavLinks: React.FC = () => {
  const { roles } = useUserAuth();

  return roles.includes(Role.ADMIN) ? <NavLink href='/admin' label='admin' /> : null;
};

const SignOutButton: React.FC = () => {
  const { user, signOut } = useUserAuth();

  return user ? (
    <Button sx={{ marginLeft: '10px' }} onClick={signOut}>
      Sign out
    </Button>
  ) : null;
};

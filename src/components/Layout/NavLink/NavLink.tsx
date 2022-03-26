import { Typography } from '@mui/material';
import type { Variant } from '@mui/material/styles/createTypography';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';

interface NavLinkProps {
  label: string;
  href: string;
  textVariant?: Variant;
}

const NavLink: React.FC<NavLinkProps> = ({ label, href, textVariant = 'body1' }) => {
  const router = useRouter();
  const selected = router.pathname === href;

  return (
    <Link href={href} passHref>
      <Typography
        variant={textVariant}
        sx={{
          '&:hover': {
            cursor: 'pointer',
            color: 'primary.main',
          },
          transition: 'color 0.2s',
          textDecoration: selected ? 'underline' : 'none',
          color: selected ? 'primary.main' : 'inherit',
        }}
      >
        {label}
      </Typography>
    </Link>
  );
};

export default NavLink;

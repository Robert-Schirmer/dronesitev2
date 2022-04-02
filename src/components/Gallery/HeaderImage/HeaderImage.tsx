import { Box } from '@mui/material';

interface Props {
  srcSet: string;
  loadingSrc: string;
  onClick: () => void;
}

const HeaderImage: React.FC<Props> = ({ srcSet, onClick, loadingSrc }) => {
  return (
    <Box
      sx={{
        img: (theme) => ({
          boxShadow: theme.boxShadow,
          borderRadius: theme.borderRadius,
          width: '90vw',
          maxWidth: '1000px',
          background: `url(${loadingSrc}) no-repeat`,
          backgroundSize: 'contain',
          '&:hover': {
            cursor: 'pointer',
          },
        }),
      }}
    >
      <img srcSet={srcSet} alt='Header image' onClick={onClick} />
    </Box>
  );
};

export default HeaderImage;

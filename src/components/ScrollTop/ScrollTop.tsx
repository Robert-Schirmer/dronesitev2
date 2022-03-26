import { Fade, Hidden, IconButton, Box } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import ArrowUpIcon from '../../assets/icons/svg/ArrowUp';

const ScrollTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 1500) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = useCallback(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Hidden smUp>
      <Fade in={visible}>
        <Box
          sx={{
            position: 'fixed',
            bottom: '10px',
            right: '20px',
          }}
        >
          <IconButton
            color='secondary'
            sx={{ border: (theme) => `2px solid ${theme.palette.secondary.main}` }}
            onClick={handleClick}
          >
            <ArrowUpIcon />
          </IconButton>
        </Box>
      </Fade>
    </Hidden>
  );
};

export default ScrollTop;

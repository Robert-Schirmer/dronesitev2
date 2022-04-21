import { Box, IconButton, Zoom } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import Close from 'assets/icons/svg/Close';
import Loading from 'components/Loading';

interface ModalProps {
  visible: boolean;
  loadingSrc: string;
  srcSet: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ srcSet, visible, loadingSrc, onClose }) => {
  const [loading, setLoading] = useState(visible);
  const imgRef = useRef<HTMLImageElement>(null);
  const scrollPosition = useRef<number>(0);

  useEffect(() => {
    if (visible) {
      if (imgRef.current && !imgRef.current.complete) {
        // Show loading indicator if image is not loaded
        setLoading(true);
        imgRef.current.onload = function () {
          setLoading(false);
        };
      }
      // Save scroll position and dont allow scrolling
      scrollPosition.current = window.scrollY;
      document.body.classList.add('overflow-hidden');
    }
  }, [visible]);

  const handleClose = useCallback(() => {
    // Scroll back to prev position in body
    document.body.classList.remove('overflow-hidden');
    window.scrollTo(0, scrollPosition.current);
    onClose();
  }, [onClose]);

  return visible ? (
    <Box
      sx={{
        background: 'rgba(0, 0, 0, 1)',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        maxWidth: '3000px',
        zIndex: 2,
        overflow: 'auto',
        img: {
          maxWidth: '100%',
          maxHeight: '100%',
          background: `url(${loadingSrc}) no-repeat`,
          backgroundSize: 'contain',
        },
        '.loading-icon': {
          position: 'absolute',
        },
        '.close-modal': {
          zIndex: 3,
          position: 'absolute',
          top: 15,
          right: 15,
          color: 'secondary.main',
        },
      }}
    >
      <IconButton className='close-modal' onClick={handleClose}>
        <Close />
      </IconButton>
      <Zoom in={true}>
        <img ref={imgRef} srcSet={srcSet} alt='Drone image large' />
      </Zoom>
      {loading && <Loading className='loading-icon' />}
    </Box>
  ) : null;
};

export default Modal;

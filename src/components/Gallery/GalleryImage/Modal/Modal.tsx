import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Loading from '../../../Loading';

interface ModalProps {
  visible: boolean;
  loadingSrc: string;
  srcSet: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ srcSet, visible, loadingSrc, onClose }) => {
  const [loading, setLoading] = useState(visible);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (visible && imgRef.current && !imgRef.current.complete) {
      // Show loading indicator if image is not loaded
      setLoading(true);
      imgRef.current.onload = function () {
        setLoading(false);
      };
    }
  }, [visible]);

  return visible ? (
    <Box
      sx={{
        background: 'rgba(0, 0, 0, 0.5)',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        padding: '20px',
        maxWidth: '2000px',
        zIndex: 2,
        img: {
          maxWidth: '100%',
          maxHeight: '80vh',
          borderRadius: (theme) => theme.borderRadius,
          background: `url(${loadingSrc}) no-repeat`,
          backgroundSize: 'contain',
        },
        '.loading-icon': {
          position: 'absolute',
        },
      }}
      onClick={onClose}
    >
      <img ref={imgRef} srcSet={srcSet} alt='Drone image large' />
      {loading && <Loading className='loading-icon' />}
    </Box>
  ) : null;
};

export default Modal;

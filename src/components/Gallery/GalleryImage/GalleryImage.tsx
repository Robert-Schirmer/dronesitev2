import { useCallback, useMemo, useState } from 'react';
import HeaderImage from '../HeaderImage';
import Modal from '../Modal';
import Thumbnail from '../Thumbnail';
import type { Image } from '../types';
import { createImagePath, createSrcSet } from '../utils';

interface Props {
  image: Image;
  header?: boolean;
  modalOpen?: boolean;
  onThumbnailClick?: () => void;
  onModalClose?: () => void;
}

const GalleryImage: React.FC<Props> = ({ image, modalOpen, onThumbnailClick, onModalClose, header }) => {
  const { gallerySrc, srcSet, loadingSrc } = useMemo(() => {
    return {
      loadingSrc: createImagePath(image.src, 300),
      gallerySrc: createImagePath(image.src, 600),
      srcSet: createSrcSet(image.src),
    };
  }, [image.src]);
  const [localVisible, setLocalVisible] = useState(false);
  const useLocalState = useMemo(() => {
    return modalOpen == null;
  }, [modalOpen]);

  const handleThumbnailClick = useCallback(() => {
    if (useLocalState) {
      setLocalVisible(true);
    } else {
      onThumbnailClick?.();
    }
  }, [useLocalState, onThumbnailClick]);

  const handleModalClose = useCallback(() => {
    if (useLocalState) {
      setLocalVisible(false);
    } else {
      onModalClose?.();
    }
  }, [useLocalState, onModalClose]);

  return (
    <>
      {header ? (
        <HeaderImage srcSet={srcSet} loadingSrc={loadingSrc} onClick={handleThumbnailClick} />
      ) : (
        <Thumbnail src={gallerySrc} loadingSrc={loadingSrc} onClick={handleThumbnailClick} />
      )}
      <Modal
        srcSet={srcSet}
        visible={useLocalState ? localVisible : modalOpen!}
        loadingSrc={loadingSrc}
        onClose={handleModalClose}
      />
    </>
  );
};

export default GalleryImage;

import { useCallback, useMemo, useState } from 'react';
import { convertTimestamp } from 'utils/functions';
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
  const [localVisible, setLocalVisible] = useState(false);
  const useLocalState = useMemo(() => {
    return modalOpen == null;
  }, [modalOpen]);
  const { thumbnailSrc, srcSet, loadingSrc } = useMemo(() => {
    return {
      loadingSrc: createImagePath(image.src, 300),
      thumbnailSrc: createImagePath(image.src, 600),
      srcSet: createSrcSet(image.src),
    };
  }, [image.src]);
  const postedMeta = useMemo(() => {
    return {
      label: 'Posted',
      value: convertTimestamp(image.posted).toLocaleDateString(),
    };
  }, [image.posted]);

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
        <HeaderImage
          srcSet={srcSet}
          loadingSrc={loadingSrc}
          onClick={handleThumbnailClick}
          photoMeta={[...image.meta, postedMeta]}
        />
      ) : (
        <Thumbnail
          src={thumbnailSrc}
          loadingSrc={loadingSrc}
          onClick={handleThumbnailClick}
          photoMeta={[...image.meta, postedMeta]}
        />
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

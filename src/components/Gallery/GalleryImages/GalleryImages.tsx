import useGalleryFilter from 'utils/hooks/useGalleryFilter';
import { ImageDoc } from 'utils/models/DocInterfaces';
import Filters from '../Filters';
import GalleryImage from '../GalleryImage';

interface Props {
  imgs: ImageDoc[];
}

const GalleryImages: React.FC<Props> = ({ imgs }) => {
  const { filteredImgs, allFilters, onFilterChange } = useGalleryFilter({ allImgs: imgs });

  return (
    <>
      {!!allFilters.length && <Filters filters={allFilters} onFilterChange={onFilterChange} />}
      {filteredImgs.map((img) => (
        <GalleryImage key={img.docRef.id} image={img} />
      ))}
    </>
  );
};

export default GalleryImages;

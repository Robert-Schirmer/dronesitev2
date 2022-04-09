import { useCallback, useEffect, useState, useTransition } from 'react';
import { Filter } from './types';
import { createFilters } from './utils';
import type { ImageDoc } from '../../models/DocInterfaces';

/**
 * Hook to provide and consume set filters on gallery images
 */
const useGalleryFilter = ({ allImgs }: { allImgs: ImageDoc[] }) => {
  const [isPending, startTransition] = useTransition();
  const [filteredImgs, setFilteredImgs] = useState<ImageDoc[]>(allImgs);
  const [allFilters, setAllFilters] = useState<Filter[]>([]);

  useEffect(() => {
    setAllFilters(createFilters(allImgs, ['Location']));
  }, [allImgs]);

  const onFilterChange = useCallback(
    (filterIndex: number, newValue: string) => {
      setAllFilters((prevFilters) => {
        prevFilters[filterIndex].selected = newValue;
        return [...prevFilters];
      });
      startTransition(() => {
        if (newValue === 'All') {
          setFilteredImgs([...allImgs]);
        } else {
          const newFilteredImages = allImgs.filter((img) => {
            return img.meta.some((meta) => {
              if (meta.label === allFilters[filterIndex].label && meta.value === newValue) {
                return true;
              }
            });
          });
          setFilteredImgs(newFilteredImages);
        }
      });
    },
    [allImgs, allFilters],
  );

  return { filteredImgs, allFilters, isFiltering: isPending, onFilterChange };
};

export default useGalleryFilter;

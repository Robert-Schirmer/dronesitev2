import type { Filter } from './types';
import { ImageDoc } from '../../models/DocInterfaces';

export const createFilters = (imgs: ImageDoc[], metaFilterLabels: string[]): Filter[] => {
  const imgMetaFiltersMap = metaFilterLabels.reduce((prev, label) => {
    prev[label] = new Set();
    return prev;
  }, {} as { [metaLabel: string]: Set<string> });

  for (const img of imgs) {
    for (const imgMeta of img.meta) {
      if (imgMetaFiltersMap[imgMeta.label]) {
        // This is a filter we are looking for
        imgMetaFiltersMap[imgMeta.label].add(imgMeta.value);
      }
    }
  }

  const filters: Filter[] = [];

  // Convert the meta filters map into filters
  for (const metaFilterKey of Object.keys(imgMetaFiltersMap)) {
    filters.push({
      label: metaFilterKey,
      selected: 'All',
      options: ['All', ...Array.from(imgMetaFiltersMap[metaFilterKey])],
    });
  }

  return filters;
};

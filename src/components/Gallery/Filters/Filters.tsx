import { Grid, MenuItem } from '@mui/material';
import type { Filter } from '../../../utils/hooks/useGalleryFilter/types';
import Select from '../../inputs/Select';

interface Props {
  filters: Filter[];
  onFilterChange: (filterIndex: number, newValue: string) => void;
}

const Filters: React.FC<Props> = ({ filters, onFilterChange }) => {
  return (
    <Grid container justifyContent='center'>
      {filters.map((filter, index) => (
        <Grid item key={filter.label}>
          <Select
            sx={{ minWidth: '100px' }}
            label={filter.label}
            value={filter.selected}
            onChange={(event) => onFilterChange(index, event.target.value as string)}
          >
            {filter.options.map((filterOption) => (
              <MenuItem key={filterOption} value={filterOption}>
                {filterOption}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      ))}
    </Grid>
  );
};

export default Filters;

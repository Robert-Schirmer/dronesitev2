import { Box, styled, Tooltip, tooltipClasses, TooltipProps, Typography } from '@mui/material';
import InfoIcon from '../../../assets/icons/svg/Info';
import type { PhotoMeta } from '../../../utils/models/DocInterfaces';

interface Props {
  photoMeta: PhotoMeta[];
}

const PhotoMetaInfo: React.FC<Props> = ({ photoMeta }) => {
  return photoMeta.length ? (
    <Box
      sx={{
        position: 'absolute',
        bottom: 5,
        right: 5,
        svg: {
          color: 'secondary.main',
          height: '20px',
          width: '20px',
        },
      }}
    >
      <MetaDataTooltip
        title={
          <>
            {photoMeta.map((meta, index) => (
              <Typography variant='body2' key={index}>
                {meta.label}: {meta.value}
              </Typography>
            ))}
          </>
        }
      >
        <InfoIcon />
      </MetaDataTooltip>
    </Box>
  ) : null;
};

export default PhotoMetaInfo;

const MetaDataTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    border: `2px solid ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.background.content,
    borderRadius: theme.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    color: theme.palette.text.primary,
  },
}));

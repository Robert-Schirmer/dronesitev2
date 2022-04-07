import { Box, styled, Tooltip, tooltipClasses, TooltipProps, Typography, ClickAwayListener } from '@mui/material';
import { useCallback, useState } from 'react';
import InfoIcon from '../../../assets/icons/svg/Info';
import type { PhotoMeta } from '../../../utils/models/DocInterfaces';

interface Props {
  photoMeta: PhotoMeta[];
}

const PhotoMetaInfo: React.FC<Props> = ({ photoMeta }) => {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleTooltipOpen = useCallback(() => {
    setOpen(true);
  }, []);

  return photoMeta.length ? (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Box
        sx={{
          position: 'absolute',
          bottom: 10,
          right: 5,
          display: 'flex',
          svg: {
            color: 'secondary.main',
            height: '20px',
            width: '20px',
          },
          '&:hover': {
            cursor: 'pointer',
          },
        }}
      >
        <MetaDataTooltip
          // PopperProps={{
          //   disablePortal: true,
          // }}
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
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
          <InfoIcon onClick={handleTooltipOpen} />
        </MetaDataTooltip>
      </Box>
    </ClickAwayListener>
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

import { SvgIcon, SvgIconProps } from '@mui/material';

const RefrshIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props} viewBox='0 0 30 30'>
      <path d='M4 15A11 11 0 0123.114 7.575l-4.43 1.477a1 1 0 10.632 1.9l6-2A1 1 0 0026 8V2a1 1 0 00-2 0V5.653A12.975 12.975 0 002 15a1 1 0 002 0zM27 14a1 1 0 00-1 1A11 11 0 016.886 22.425l4.43-1.477a1 1 0 10-.632-1.9l-6 2A1 1 0 004 22v6a1 1 0 002 0V24.347A12.975 12.975 0 0028 15 1 1 0 0027 14z' />
    </SvgIcon>
  );
};

export default RefrshIcon;

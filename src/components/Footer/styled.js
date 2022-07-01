import { styled } from '@mui/system';
import theme from '../../ultils/Theme';

export const StyledFooter = styled('footer')(() => ({
  width: '100%',
  zIndex: theme.zIndex.drawer + 1,
  position: 'relative',
}));
export const FooterImage = styled('img')(() => ({
  width: '25em',
  verticalAlign: 'bottom',
  [theme.breakpoints.down('md')]: {
    width: '21em',
  },
  [theme.breakpoints.down('sm')]: {
    width: '15em',
  },
}));
export const IconImage = styled('img')(() => ({
  with: '4em',
  height: '4em',
  [theme.breakpoints.down('sm')]: {
    width: '2.5em',
    height: '2.5em',
  },
}));

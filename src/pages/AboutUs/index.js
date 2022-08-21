import { Box } from '@mui/system';
import { Grid, Typography } from '@mui/material';
import translate from '../../i18n/translate';
import theme from '../../ultils/Theme';
import history from '../../assets/history.svg';

export default function AboutUs() {
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Grid container direction='column'>
        <Grid
          item
          sx={{
            paddingLeft: '5em',
            paddingRight: '5em',
            [theme.breakpoints.down('sm')]: {
              paddingLeft: '1.5em',
              paddingRight: '1.5em',
            },
          }}
        >
          <Typography sx={{ fontSize: '4rem' }}>
            {translate('about')}
          </Typography>
        </Grid>
        <Grid
          item
          container
          justifyContent='center'
          sx={{
            paddingLeft: '5em',
            paddingRight: '5em',
            [theme.breakpoints.down('sm')]: {
              paddingLeft: '1.5em',
              paddingRight: '1.5em',
            },
          }}
        >
          <Typography
            align='center'
            sx={{
              fontSize: '1.5rem',
              fontStyle: 'italic',
              fontWeight: '300',
              maxWidth: '50em',
              lineHeight: '1.4',
            }}
          >
            {translate('coronavirus')}
          </Typography>
        </Grid>
        <Grid
          item
          container
          sx={{
            paddingLeft: '5em',
            paddingRight: '5em',
            [theme.breakpoints.down('sm')]: {
              paddingLeft: '1.5em',
              paddingRight: '1.5em',
            },
          }}
        >
          <Grid item container direction='column' lg>
            <Grid item>
              <Typography gutterBottom sx={{ fontSize: '2rem' }}>
                {translate('history')}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant='body1'
                paragraph
                sx={{ fontWeight: '700', fontStyle: 'italic' }}
              >
                {translate('paragraph1')}
              </Typography>
              <Typography
                variant='body1'
                paragraph
                sx={{ fontWeight: '700', fontStyle: 'italic' }}
              >
                {translate('paragraph2')}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container justifyContent='center' alignItems='center' lg>
            <img src={history} alt=''></img>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

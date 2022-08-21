import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Hidden } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import translate from '../../i18n/translate';
import theme from '../../ultils/Theme';
import { classes } from './classes';
import { StyledFooter, FooterImage, IconImage } from './styled';
import footerLogo from '../../assets/FooterLogo.svg';
import facebook from '../../assets/facebook.svg';
import twitter from '../../assets/twitter.svg';
import instagram from '../../assets/instagram.svg';

const Footer = () => {
  const defaultTheme = useTheme();
  return (
    <StyledFooter
      sx={
        defaultTheme.palette.mode === 'dark'
          ? { bgcolor: 'black' }
          : { bgcolor: theme.palette.primary.main }
      }
    >
      <Hidden mdDown>
        <Grid container justifyContent='center' sx={classes.gridContainer}>
          <Grid item sx={classes.gridItem}>
            <Grid container direction='column'>
              <Grid item component={Link} to='/' sx={classes.gridLink}>
                {translate('home')}
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={classes.gridItem}>
            <Grid container direction='column' spacing={2}>
              <Grid item component={Link} to='/services' sx={classes.gridLink}>
                {translate('services')}
              </Grid>
              <Grid item component={Link} to='/newcases' sx={classes.gridLink}>
                {translate('cases')}
              </Grid>
              <Grid item component={Link} to='/deads' sx={classes.gridLink}>
                {translate('deads')}
              </Grid>
              <Grid
                item
                component={Link}
                to='/vacinations'
                sx={classes.gridLink}
              >
                {translate('vacinations')}
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={classes.gridItem}>
            <Grid container direction='column'>
              <Grid item component={Link} to='/news' sx={classes.gridLink}>
                {translate('news')}
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={classes.gridItem}>
            <Grid container direction='column'>
              <Grid item component={Link} to='/about' sx={classes.gridLink}>
                {translate('about')}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
      <FooterImage alt='footer logo' src={footerLogo} />
      <Grid
        container
        justifyContent='flex-end'
        spacing={2}
        sx={classes.socialContainer}
      >
        <Grid
          item
          component={'a'}
          href='https://www.facebook.com'
          rel='noopener noreferrer'
          target='_blank'
        >
          <IconImage alt='facebook' src={facebook} />
        </Grid>
        <Grid
          item
          component={'a'}
          href='https://www.twitter.com'
          rel='noopener noreferrer'
          target='_blank'
        >
          <IconImage alt='twitter' src={twitter} />
        </Grid>
        <Grid
          item
          component={'a'}
          href='https://www.instagram.com'
          rel='noopener noreferrer'
          target='_blank'
        >
          <IconImage alt='instagram' src={instagram} />
        </Grid>
      </Grid>
    </StyledFooter>
  );
};
export default Footer;

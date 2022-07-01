import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Button,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

import logo from '../../assets/logo.svg';
import './Header.css';
import SubTabs from './tabs';
import SubDrawer from './drawers';
import {
  TollbarMargin,
  Image,
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from './styled';
import { classes } from './classes';

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}
const Header = ({ colorMode, setLocale }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const [value, setValue] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const handleInputValueChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    switch (window.location.pathname) {
      case '/':
        if (value !== 0) {
          setValue(0);
        }
        break;
      case '/newcases':
        if (value !== 1) {
          setValue(1);
        }
        break;
      case '/deads':
        if (value !== 1) {
          setValue(1);
        }
        break;
      case '/vacinations':
        if (value !== 1) {
          setValue(1);
        }
        break;
      case '/news':
        if (value !== 2) {
          setValue(2);
        }
        break;
      case '/about':
        if (value !== 3) {
          setValue(3);
        }
        break;
      default:
        break;
    }
  }, [value]);
  return (
    <>
      <ElevationScroll>
        <AppBar position='fixed' sx={classes.appbar}>
          <Toolbar disableGutters>
            <Button
              component={Link}
              to='/'
              disableRipple
              onClick={() => setValue(0)}
              sx={classes.logoContainer}
            >
              <Image alt='company logo' src={logo} />
            </Button>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder='Search...'
                inputProps={{ 'aria-label': 'search' }}
                value={inputValue}
                onChange={handleInputValueChange}
              />
            </Search>
            {matches ? (
              <SubDrawer
                value={value}
                setValue={setValue}
                colorMode={colorMode}
                setLocale={setLocale}
              />
            ) : (
              <SubTabs
                colorMode={colorMode}
                setLocale={setLocale}
                value={value}
                setValue={setValue}
              />
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <TollbarMargin />
    </>
  );
};
export default Header;

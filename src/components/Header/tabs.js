import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Tabs,
  Tab,
  Menu,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AuthActions } from '../../redux/rootAction';
import { LOCALES } from '../../i18n';
import translate from '../../i18n/translate';
import './Header.css';
import { classes } from './classes';
import { checkToken } from '../../ultils/checkToken';

const SubTabs = ({ colorMode, setLocale, value, setValue }) => {
  const token = useSelector((state) => state.AuthReducer.token);
  const dispatch = useDispatch();
  const [anchorSetting, setAnchorSetting] = useState(null);
  const [anchorUser, setAnchorUser] = useState(null);

  const [settingOpen, setSettingOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [alignment, setAlignment] = useState('dark');
  const [language, setLanguage] = useState('en');

  const navigate = useNavigate();
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const handleOnchange = (event, value) => {
    setValue(value);
  };
  const handleSettingClick = (event) => {
    setAnchorSetting(event.currentTarget);
    setSettingOpen(true);
  };
  const handleUserClick = (event) => {
    setAnchorUser(event.currentTarget);
    setUserOpen(true);
  };
  const handleSettingClose = () => {
    setAnchorSetting(null);
    setSettingOpen(false);
  };
  const handleUserClose = () => {
    setAnchorUser(null);
    setUserOpen(false);
  };
  const handleLogout = () => {
    dispatch(AuthActions.setToken(null));
    navigate('/');
  };
  return (
    <Fragment>
      <Tabs
        value={value}
        indicatorColor='primary'
        textColor='inherit'
        onChange={handleOnchange}
        className='header__tabContainer'
      >
        <Tab
          sx={classes.tab}
          component={Link}
          to='/'
          label={translate('home')}
        />
        <Tab
          sx={classes.tab}
          component={Link}
          to='/details'
          label={translate('details')}
        />
        <Tab
          sx={classes.tab}
          component={Link}
          to='/news'
          label={translate('news')}
        />
        <Tab
          component={Link}
          to='/about'
          sx={classes.tab}
          label={translate('about')}
        />
        <Tab
          aria-owns={anchorSetting ? 'setting-menu' : undefined}
          aria-haspopup={anchorSetting ? true : undefined}
          onClick={(event) => handleSettingClick(event)}
          sx={classes.tab}
          label={translate('setting')}
        />
        {checkToken(token) === false ? (
          <Tab
            aria-owns={anchorUser ? 'user-menu' : undefined}
            aria-haspopup={anchorUser ? true : undefined}
            onClick={(event) => handleUserClick(event)}
            sx={classes.tab}
            label={translate('user')}
          />
        ) : (
          <Tab
            onClick={handleLogout}
            sx={classes.AuthButton}
            label={translate('logout')}
          ></Tab>
        )}
      </Tabs>
      <Menu
        id='setting-menu'
        anchorEl={anchorSetting}
        open={settingOpen}
        onClose={handleSettingClose}
        MenuListProps={{ onMouseLeave: handleSettingClose }}
        className='header__service-menu'
        elevation={0}
      >
        <MenuItem sx={classes.menuItem}>
          <ToggleButtonGroup
            color='secondary'
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton onClick={colorMode.darkMode} value='dark'>
              <Brightness4Icon sx={{ marginRight: 1 }} />
              {translate('dark')}
            </ToggleButton>
            <ToggleButton onClick={colorMode.lightMode} value='light'>
              <Brightness5Icon sx={{ marginRight: 1 }} />
              {translate('light')}
            </ToggleButton>
          </ToggleButtonGroup>
        </MenuItem>
        <MenuItem sx={classes.menuItem}>
          <FormControl variant='standard' sx={{ minWidth: 120, marginTop: 1 }}>
            <InputLabel sx={{ color: 'white' }}>
              {translate('language')}
            </InputLabel>
            <Select
              sx={{ color: 'white', marginLeft: 3 }}
              value={language}
              label='Language'
              onChange={handleLanguageChange}
            >
              <MenuItem onClick={() => setLocale(LOCALES.ENGLISH)} value={'en'}>
                {translate('english')}
              </MenuItem>
              <MenuItem
                onClick={() => setLocale(LOCALES.VIETNAMESE)}
                value={'vi'}
              >
                {translate('vietnamese')}
              </MenuItem>
            </Select>
          </FormControl>
        </MenuItem>
      </Menu>

      <Menu
        style={{ zIndex: 1302 }}
        id='user-menu'
        anchorEl={anchorUser}
        open={userOpen}
        onClose={handleUserClose}
        MenuListProps={{ onMouseLeave: handleUserClose }}
        className='header__service-menu'
        elevation={0}
      >
        <MenuItem sx={classes.AuthButton} component={Link} to='/signin'>
          {translate('login')}
        </MenuItem>
        <MenuItem sx={classes.AuthButton} component={Link} to='/register'>
          {translate('register')}
        </MenuItem>
      </Menu>
    </Fragment>
  );
};
export default SubTabs;

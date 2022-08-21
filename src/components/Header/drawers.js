import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  SwipeableDrawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemButton,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AuthActions } from '../../redux/rootAction';
import { checkToken } from '../../ultils/checkToken';
import { classes } from './classes';
import { TollbarMargin } from './styled';
import { LOCALES } from '../../i18n';
import translate from '../../i18n/translate';
import './Header.css';

const SubDrawer = ({ value, setValue, colorMode, setLocale }) => {
  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const token = useSelector((state) => state.AuthReducer.token);
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [alignment, setAlignment] = useState('dark');
  const [language, setLanguage] = useState('en');

  const navigate = useNavigate();
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };
  const handleLogout = () => {
    dispatch(AuthActions.setToken(null));
    navigate('/');
  };
  return (
    <Fragment>
      <SwipeableDrawer
        sx={classes.swipeable}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        className='header__drawer'
      >
        <TollbarMargin />
        <List disablePadding>
          <ListItem
            className='header__drawer-listItem'
            onClick={() => {
              setOpenDrawer(false);
              setValue(0);
            }}
            selected={value === 0}
            divider
            button
            component={Link}
            to='/'
          >
            <ListItemText sx={classes.drawerItem} disableTypography>
              {translate('home')}
            </ListItemText>
          </ListItem>
          <ListItem
            className='header__drawer-listItem'
            onClick={() => {
              setValue(1);
              setOpenDrawer(false);
            }}
            selected={value === 1}
            divider
            button
            component={Link}
            to='/details'
          >
            <ListItemText sx={classes.drawerItem} disableTypography>
              {translate('details')}
            </ListItemText>
          </ListItem>

          <ListItem
            className='header__drawer-listItem'
            onClick={() => {
              setOpenDrawer(false);
              setValue(2);
            }}
            selected={value === 2}
            divider
            button
            component={Link}
            to='/news'
          >
            <ListItemText sx={classes.drawerItem} disableTypography>
              {translate('news')}
            </ListItemText>
          </ListItem>
          <ListItem
            className='header__drawer-listItem'
            onClick={() => {
              setOpenDrawer(false);
              setValue(3);
            }}
            selected={value === 3}
            divider
            button
            component={Link}
            to='/about'
          >
            <ListItemText sx={classes.drawerItem} disableTypography>
              {translate('about')}
            </ListItemText>
          </ListItem>
          <ListItem
            className='header__drawer-listItem'
            onClick={() => {
              setSettingOpen(!settingOpen);
              setValue(4);
            }}
            selected={value === 4}
            divider
            button
          >
            <ListItemText sx={classes.drawerItem} disableTypography>
              {translate('setting')}
            </ListItemText>
            {settingOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={settingOpen} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
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
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <FormControl
                  variant='standard'
                  sx={{ minWidth: 120, marginTop: 1 }}
                >
                  <InputLabel sx={{ color: 'white' }}>
                    {translate('language')}
                  </InputLabel>
                  <Select
                    sx={{ color: 'white', marginLeft: 3 }}
                    value={language}
                    label='Language'
                    onChange={handleLanguageChange}
                  >
                    <MenuItem
                      onClick={() => setLocale(LOCALES.ENGLISH)}
                      value={'en'}
                    >
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
              </ListItemButton>
            </List>
          </Collapse>
          {checkToken(token) === false ? (
            <>
              <ListItem
                className='header__drawer-listItem'
                onClick={() => {
                  setUserOpen(!userOpen);
                  setValue(5);
                }}
                selected={value === 5}
                divider
                button
              >
                <ListItemText sx={classes.drawerItem} disableTypography>
                  {translate('user')}
                </ListItemText>
                {userOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={userOpen} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  <ListItemButton
                    onClick={() => setOpenDrawer(false)}
                    component={Link}
                    to='/signin'
                    sx={{ pl: 4 }}
                  >
                    <ListItemText sx={classes.drawerItem} disableTypography>
                      {translate('login')}
                    </ListItemText>
                  </ListItemButton>
                  <ListItemButton
                    onClick={() => setOpenDrawer(false)}
                    component={Link}
                    to='/register'
                    sx={{ pl: 4 }}
                  >
                    <ListItemText sx={classes.drawerItem} disableTypography>
                      {translate('register')}
                    </ListItemText>
                  </ListItemButton>
                </List>
              </Collapse>
            </>
          ) : (
            <ListItem sx={classes.LogOutButton} button onClick={handleLogout}>
              <ListItemText>{translate('logout')}</ListItemText>
            </ListItem>
          )}
        </List>
      </SwipeableDrawer>
      <IconButton
        sx={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon sx={classes.drawerIcon} />
      </IconButton>
    </Fragment>
  );
};
export default SubDrawer;

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

import { classes } from './classes';
import { TollbarMargin } from './styled';
import { LOCALES } from '../../i18n';
import translate from '../../i18n/translate';
import './Header.css';

const SubDrawer = ({ value, setValue, colorMode, setLocale }) => {
  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [alignment, setAlignment] = useState('dark');
  const [language, setLanguage] = useState('en');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
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
              setServiceOpen(!serviceOpen);
            }}
            selected={value === 1}
            divider
            button
            component={Link}
            to='/services'
          >
            <ListItemText sx={classes.drawerItem} disableTypography>
              {translate('services')}
            </ListItemText>
            {serviceOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={serviceOpen} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText sx={classes.drawerItem} disableTypography>
                  {translate('cases')}
                </ListItemText>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText sx={classes.drawerItem} disableTypography>
                  {translate('deads')}
                </ListItemText>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText sx={classes.drawerItem} disableTypography>
                  {translate('vacinations')}
                </ListItemText>
              </ListItemButton>
            </List>
          </Collapse>
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
            component={Link}
            to='/'
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
          <ListItem
            className='header__drawer-listItem'
            onClick={() => {
              setUserOpen(!userOpen);
              setValue(5);
            }}
            selected={value === 5}
            divider
            button
            component={Link}
            to='/'
          >
            <ListItemText sx={classes.drawerItem} disableTypography>
              {translate('user')}
            </ListItemText>
            {userOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={userOpen} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText sx={classes.drawerItem} disableTypography>
                  {translate('login')}
                </ListItemText>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText sx={classes.drawerItem} disableTypography>
                  {translate('register')}
                </ListItemText>
              </ListItemButton>
            </List>
          </Collapse>
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

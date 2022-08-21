import theme from '../../ultils/Theme';
export const classes = {
  drawerIcon: {
    height: '50px',
    width: '50px',
  },
  drawerIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  tab: {
    ...theme.typography.tab,
    minWith: 10,
    marginLeft: '5px',
  },
  AuthButton: {
    ...theme.typography.auth,
    borderRadius: '25px',
    margin: '20px',
    height: '35px',
  },
  appbar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: 'white',
  },
  LogOutButton: {
    ...theme.typography.auth,
  },
};

import React, { useState, useRef, useEffect,useMemo } from 'react';
import {
  Box, AppBar, Toolbar, IconButton, Typography,
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  Avatar, Menu, MenuItem, CssBaseline, Divider,
  Badge, Collapse, Paper, Fade, Grow, useMediaQuery,
  Button, ButtonGroup, Breadcrumbs, Link
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  Close as CloseIcon,
  People as PeopleIcon,
  Apartment as ApartmentIcon,
  Layers as LayersIcon,
  HelpOutline as HelpOutlineIcon,
  Receipt as ReceiptIcon,
  BarChart as BarChartIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  Cloud as CloudIcon,
  Security as SecurityIcon,
  Payment as PaymentIcon,
  Assignment as AssignmentIcon,
  Business as BusinessIcon,
  Home as HomeIcon,
  StarBorder as StarIcon,
  Palette as PaletteIcon,
  AccountTree as AccountTreeIcon,
  Folder as FolderIcon,
  SettingsApplications as SettingsAppIcon,
  VpnKey as VpnKeyIcon,
  NavigateNext as NavigateNextIcon
} from '@mui/icons-material';
import { useNavigate, Outlet, useLocation, useParams, useMatch } from 'react-router-dom';
import { styled, useTheme, alpha } from '@mui/material/styles';
import { useAuth } from '../utils/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const drawerWidth = 280;
const collapsedDrawerWidth = 80;

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -4,
    top: 10,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 5px',
    fontWeight: 700,
    fontSize: '0.7rem',
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
}));

const SidebarListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(0.5, 1),
  paddingLeft: theme.spacing(2.5),
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
  color: active ? theme.palette.primary.main : theme.palette.text.primary,
  fontWeight: active ? 600 : 400,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
    color: theme.palette.primary.dark,
  },
  transition: theme.transitions.create(['background-color', 'color', 'transform'], {
    duration: theme.transitions.duration.shorter,
    easing: theme.transitions.easing.easeInOut,
  }),
  '&:active': {
    transform: 'scale(0.98)',
  },
  justifyContent: 'flex-start',
}));

const SidebarSubListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(0.2, 1),
  paddingLeft: theme.spacing(5),
  backgroundColor: active ? alpha(theme.palette.secondary.main, 0.1) : 'transparent',
  color: active ? theme.palette.secondary.dark : theme.palette.text.secondary,
  fontWeight: active ? 600 : 400,
  '&:hover': {
    backgroundColor: alpha(theme.palette.secondary.main, 0.15),
    color: theme.palette.secondary.dark,
  },
  transition: theme.transitions.create(['background-color', 'color', 'transform'], {
    duration: theme.transitions.duration.shorter,
    easing: theme.transitions.easing.easeInOut,
  }),
  '&:active': {
    transform: 'scale(0.98)',
  },
}));

const DashboardLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const mainContentRef = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for header shadow
  useEffect(() => {
    const handleScroll = () => {
      if (mainContentRef.current) {
        setIsScrolled(mainContentRef.current.scrollTop > 5);
      }
    };

    const contentElement = mainContentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
      return () => contentElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Auto-close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleNotificationsMenuOpen = (event) => setNotificationsAnchorEl(event.currentTarget);
  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationsAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleMenuClose();
  };

  const toggleSubmenu = (menuKey) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const StaticFooter = styled('footer')(({ theme }) => ({
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.background.paper,
    borderTop: `1px solid ${theme.palette.divider}`,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize: '0.75rem',
    zIndex: theme.zIndex.drawer - 1,
    marginLeft: sidebarOpen ? `${drawerWidth}px` : `${collapsedDrawerWidth}px`,
    transition: theme.transitions.create(['margin-left'], {
      duration: theme.transitions.duration.standard,
      easing: theme.transitions.easing.easeInOut,
    }),
  }));

  const metrics = [
    { title: 'Total Revenue', value: '$30,200', change: '+3%', isPositive: true, icon: <ReceiptIcon color="primary" /> },
    { title: 'Active Users', value: '1,430', change: '+8%', isPositive: true, icon: <PeopleIcon color="primary" /> },
    { title: 'Properties', value: '290+', change: '+12%', isPositive: true, icon: <ApartmentIcon color="primary" /> },
    { title: 'Occupancy Rate', value: '86%', change: '+2%', isPositive: true, icon: <BarChartIcon color="primary" /> },
  ];

  const trafficSources = [
    { name: 'Direct', value: 80, color: theme.palette.primary.main, icon: <HomeIcon /> },
    { name: 'Social', value: 50, color: theme.palette.info.main, icon: <PeopleIcon /> },
    { name: 'Referral', value: 20, color: theme.palette.success.main, icon: <StarIcon /> },
    { name: 'Organic', value: 60, color: theme.palette.warning.main, icon: <AccountTreeIcon /> },
    { name: 'Paid', value: 40, color: theme.palette.secondary.main, icon: <PaymentIcon /> },
  ];

  const notifications = [
    { id: 1, text: 'New property added to your portfolio', time: '5 mins ago', icon: <ApartmentIcon color="primary" /> },
    { id: 2, text: 'Maintenance request completed', time: '2 hours ago', icon: <AssignmentIcon color="success" /> },
    { id: 3, text: 'Payment received from tenant', time: '1 day ago', icon: <PaymentIcon color="info" /> },
  ];

  const menuItems = useMemo(() => [
    {
      section: 'DASHBOARD',
      items: [
        {
          name: 'Dashboard',
          icon: <DashboardIcon />,
          path: '/dashboard',
        }
      ],
    },
    {
      section: 'MASTER MENU',
      items: [
        {
          name: 'Masters',
          icon: <SettingsIcon />,
          key: 'masters',
          submenu: [
            {
              name: 'Room Management',
              icon: <ApartmentIcon />,
              key: 'roommanagement',
              submenu: [
                { name: 'Block Master', path: '/dashboard/block-master', icon: <BusinessIcon /> },
                { name: 'Floor Master', path: '/dashboard/floor-master', icon: <LayersIcon /> },
                { name: 'Room Type Master', path: '/dashboard/room-type-master', icon: <HomeIcon /> },
                { name: 'Room Master', path: '/dashboard/room-master', icon: <HomeIcon /> },
                { name: 'Block Room', path: '/dashboard/block-room', icon: <VpnKeyIcon /> },
                { name: 'Un Block Room', path: '/dashboard/unblock-room', icon: <VpnKeyIcon /> },
              ],
            },
          ],
        },
      ],
    },
    {
      section: 'REPORT MENU',
      items: [
        {
          name: 'Reports',
          icon: <SettingsIcon />,
          key: 'reports',
          submenu: [
            {
              name: 'Non Revenue Reports',
              icon: <ApartmentIcon />,
              key: 'nonrevenuereports',
              submenu: [
                { name: 'Police Report', path: '/dashboard/police-report', icon: <BusinessIcon /> },
              ],
            },
            {
              name: 'Revenue Reports',
              icon: <PeopleIcon />,
              key: 'revenuereports',
              submenu: [
                { name: 'Talent Profiles', path: '/dashboard/talent-profiles', icon: <AccountCircleIcon /> },
              ],
            },
          ],
        },
      ],
    },
    {
      section: 'SYSTEM',
      items: [
        {
          name: 'Settings',
          icon: <SettingsIcon />,
          path: '/dashboard/settings',
        },
        {
          name: 'Logout',
          icon: <LogoutIcon />,
          action: handleLogout,
        },
      ],
    },
  ], []);
  const isActive = (path) => {
    return location.pathname === path;
  };

  const renderMenuItems = () =>
  menuItems.map((section, sectionIndex) => (
    <React.Fragment key={sectionIndex}>
      {sidebarOpen && (
        <ListItem sx={{ py: 1.5 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              fontWeight: '600',
              letterSpacing: 1.2,
              pl: 2,
              opacity: sidebarOpen ? 1 : 0,
              transition: theme.transitions.create('opacity', {
                duration: theme.transitions.duration.standard,
              }),
            }}
          >
            {section.section}
          </Typography>
        </ListItem>
      )}
      {section.items.map((item, itemIndex) => (
        <React.Fragment key={itemIndex}>
          {item.submenu ? (
            <>
              <SidebarListItem
                button
                onClick={() => toggleSubmenu(item.key)}
                active={openSubmenus[item.key]} // Changed this line
                sx={{ px: 2.5 }}
              >
                <ListItemIcon sx={{
                  minWidth: 36,
                  color: openSubmenus[item.key] ? theme.palette.primary.main : 'inherit',
                }}>
                  {item.icon}
                </ListItemIcon>
                {sidebarOpen && (
                  <>
                    <ListItemText
                      primary={item.name}
                      secondary={item.description}
                      primaryTypographyProps={{
                        fontWeight: openSubmenus[item.key] ? 600 : 400,
                      }}
                    />
                    {openSubmenus[item.key] ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                  </>
                )}
              </SidebarListItem>
              <Collapse in={openSubmenus[item.key] && sidebarOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.submenu.map((subItem, subIndex) => (
                    <React.Fragment key={subIndex}>
                      {subItem.submenu ? (
                        <>
                          <SidebarSubListItem
                            button
                            onClick={() => toggleSubmenu(subItem.key)}
                            active={openSubmenus[subItem.key]} // Changed this line
                          >
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              {subItem.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={subItem.name}
                              secondary={subItem.description}
                              primaryTypographyProps={{
                                fontWeight: openSubmenus[subItem.key] ? 600 : 400,
                              }}
                            />
                            {openSubmenus[subItem.key] ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                          </SidebarSubListItem>
                          <Collapse in={openSubmenus[subItem.key] && sidebarOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                              {subItem.submenu.map((subSubItem, subSubIndex) => (
                                <SidebarSubListItem
                                  key={subSubIndex}
                                  button
                                  active={isActive(subSubItem.path)}
                                  onClick={() => navigate(subSubItem.path)}
                                  sx={{ pl: 6 }}
                                >
                                  <ListItemIcon sx={{ minWidth: 36 }}>
                                    {subSubItem.icon}
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={subSubItem.name}
                                    primaryTypographyProps={{
                                      fontWeight: isActive(subSubItem.path) ? 600 : 400,
                                    }}
                                  />
                                </SidebarSubListItem>
                              ))}
                            </List>
                          </Collapse>
                        </>
                      ) : (
                        <SidebarSubListItem
                          button
                          active={isActive(subItem.path)}
                          onClick={() => navigate(subItem.path)}
                        >
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            {subItem.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={subItem.name}
                            primaryTypographyProps={{
                              fontWeight: isActive(subItem.path) ? 600 : 400,
                            }}
                          />
                        </SidebarSubListItem>
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Collapse>
            </>
          ) : (
            <SidebarListItem
              button
              active={item.path ? isActive(item.path) : false}
              onClick={() => {
                if (item.action) {
                  item.action();
                } else if (item.path) {
                  navigate(item.path);
                }
              }}
              sx={{ px: 2.5 }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                {item.icon}
              </ListItemIcon>
              {sidebarOpen && (
                <ListItemText
                  primary={item.name}
                  secondary={item.description}
                />
              )}
            </SidebarListItem>
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  ));

  // Extract the current route name for breadcrumbs
  const getCurrentRouteName = () => {
    const route = menuItems
      .flatMap(section => section.items)
      .flatMap(item => item.submenu ? item.submenu.flatMap(sub => sub.submenu ? sub.submenu : sub) : item)
      .find(item => item.path === location.pathname);
    
    return route ? route.name : location.pathname.split('/').pop().replace(/-/g, ' ');
  };

  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      bgcolor: theme.palette.grey[50],
      overflow: 'hidden',
    }}>
      <CssBaseline />

      {/* AppBar with elevation on scroll */}
      <AppBar
        position="fixed"
        elevation={isScrolled ? 4 : 0}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          bgcolor: isScrolled ? alpha(theme.palette.primary.main, 0.96) : theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          backdropFilter: isScrolled ? 'blur(8px)' : 'none',
          transition: theme.transitions.create(['background-color', 'box-shadow', 'backdrop-filter'], {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeInOut,
          }),
          borderBottom: isScrolled ? `1px solid ${alpha(theme.palette.primary.light, 0.2)}` : 'none',
        }}
      >
        <Toolbar sx={{ minHeight: 64 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleSidebar}
            sx={{
              mr: 2,
              transform: sidebarOpen ? 'rotate(0deg)' : 'rotate(90deg)',
              transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.standard,
              }),
            }}
            aria-label="toggle sidebar"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: 1.1,
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Dashboard
            </motion.span>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              color="inherit"
              onClick={handleNotificationsMenuOpen}
              aria-label="show notifications"
              sx={{
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.contrastText, 0.1),
                },
              }}
            >
              <StyledBadge badgeContent={notifications.length} color="error">
                <NotificationsIcon />
              </StyledBadge>
            </IconButton>
            <IconButton
              edge="end"
              onClick={handleProfileMenuOpen}
              color="inherit"
              aria-label="account of current user"
              sx={{
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.contrastText, 0.1),
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: alpha(theme.palette.primary.contrastText, 0.2),
                  color: theme.palette.primary.contrastText,
                  width: 36,
                  height: 36,
                  fontWeight: 'bold',
                  transition: theme.transitions.create(['background-color', 'transform'], {
                    duration: theme.transitions.duration.shorter,
                  }),
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Secondary Navigation Bar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          top: 64, // Position below the main AppBar
          zIndex: theme.zIndex.drawer,
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderBottom: `1px solid ${theme.palette.divider}`,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard,
          }),
          marginLeft: sidebarOpen ? `${drawerWidth}px` : `${collapsedDrawerWidth}px`,
          width: sidebarOpen ? `calc(100% - 280px)` : `calc(100% - 0px)`,
        }}
      >
        <Toolbar variant="dense" sx={{ minHeight: 48 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            {/* Breadcrumbs */}
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
              sx={{ mr: 2 }}
            >
              <Link
                underline="hover"
                color="inherit"
                href="#"
                onClick={() => navigate('/dashboard')}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <DashboardIcon sx={{ mr: 0.5, fontSize: 'inherit' }} />
                Dashboard
              </Link>
              {location.pathname !== '/dashboard' && (
                <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
                  {getCurrentRouteName()}
                </Typography>
              )}
            </Breadcrumbs>

            {/* Quick Action Buttons */}
            <Box sx={{ flexGrow: 1 }} />
            <ButtonGroup variant="contained" size="small" sx={{ ml: 'auto' }}>
              <Button
                startIcon={<ReceiptIcon />}
                onClick={() => navigate('/dashboard/check-in-room')}
                sx={{
                  textTransform: 'none',
                  bgcolor: isActive('/dashboard/check-in-room') ?
                    alpha(theme.palette.primary.main, 0.9) :
                    alpha(theme.palette.primary.main, 0.7),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.9),
                  },
                }}
              >
                Check-In
              </Button>
              <Button
                startIcon={<HomeIcon />}
                onClick={() => navigate('/dashboard/checkin-list')}
                sx={{
                  textTransform: 'none',
                  bgcolor: isActive('/dashboard/checkin-list') ?
                    alpha(theme.palette.success.main, 0.9) :
                    alpha(theme.palette.success.main, 0.7),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.success.main, 0.9),
                  },
                }}
              >
                Checkin-list
              </Button>
              <Button
                startIcon={<BarChartIcon />}
                onClick={() => console.log('Generate Report')}
                sx={{
                  textTransform: 'none',
                  bgcolor: isActive('/dashboard/floor-master') ?
                    alpha(theme.palette.warning.main, 0.9) :
                    alpha(theme.palette.warning.main, 0.7),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.warning.main, 0.9),
                  },
                }}
              >
                Generate Report
              </Button>
            </ButtonGroup>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer with smooth transitions */}
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        open={sidebarOpen}
        onClose={toggleSidebar}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: sidebarOpen ? drawerWidth : collapsedDrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sidebarOpen ? drawerWidth : collapsedDrawerWidth,
            boxSizing: 'border-box',
            borderRight: 'none',
            boxShadow: theme.shadows[3],
            transition: theme.transitions.create(['width', 'transform'], {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.standard,
            }),
            overflowX: 'hidden',
          },
        }}
      >
        <Toolbar sx={{
          px: 2,
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          fontWeight: 700,
          minHeight: 64,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          {sidebarOpen ? (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              PropertyPro
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <BusinessIcon />
            </motion.div>
          )}
          {isMobile && (
            <IconButton onClick={toggleSidebar} sx={{ color: 'inherit' }}>
              <CloseIcon />
            </IconButton>
          )}
        </Toolbar>
        <Divider />
        <List sx={{
          mt: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: alpha(theme.palette.primary.main, 0.1),
          },
          '&::-webkit-scrollbar-thumb': {
            background: alpha(theme.palette.primary.main, 0.4),
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: alpha(theme.palette.primary.main, 0.6),
          },
        }}>
          {renderMenuItems()}
        </List>
      </Drawer>

      {/* Main content area with smooth transitions */}
      <Box
        component="main"
        ref={mainContentRef}
        sx={{
          flexGrow: 1,
          p: 3,
          pb: 10,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard,
          }),
          minHeight: '100vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          marginLeft: {
            xs: 0,
            md: sidebarOpen ? `0px` : `-80px`
          },
          width: {
            xs: '100%',
            md: sidebarOpen ? `calc(100% - ${drawerWidth}px)` : `calc(100% - ${collapsedDrawerWidth}px)`
          },
          marginTop: 13, // Account for both AppBars
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
        <StaticFooter sidebarOpen={sidebarOpen}>
          © {new Date().getFullYear()} Goio Tech. All rights reserved.
        </StaticFooter>
      </Box>

      {/* Profile Menu with animations */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        keepMounted
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          elevation: 4,
          sx: {
            mt: 1.5,
            minWidth: 200,
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: theme.shadows[10],
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            navigate('/profile');
            handleMenuClose();
          }}
          sx={{
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.1),
            },
          }}
        >
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText primary="Profile" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate('/dashboard/settings');
            handleMenuClose();
          }}
          sx={{
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.1),
            },
          }}
        >
          <ListItemIcon>
            <SettingsIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText primary="Settings" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{
            '&:hover': {
              bgcolor: alpha(theme.palette.error.main, 0.1),
            },
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primary="Logout" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>

      {/* Notifications Menu with animations */}
      <Menu
        anchorEl={notificationsAnchorEl}
        open={Boolean(notificationsAnchorEl)}
        onClose={handleMenuClose}
        keepMounted
        TransitionComponent={Grow}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          elevation: 4,
          sx: {
            mt: 1.5,
            width: 320,
            maxWidth: '100%',
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: theme.shadows[10],
          },
        }}
      >
        <Paper sx={{ p: 2, bgcolor: 'background.paper' }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1,
          }}>
            <Typography variant="subtitle1" fontWeight="bold" color="primary">
              Notifications
            </Typography>
            <StyledBadge badgeContent={notifications.length} color="error">
              <Typography variant="caption" color="text.secondary">
                {notifications.length} new
              </Typography>
            </StyledBadge>
          </Box>
          {notifications.length === 0 ? (
            <MenuItem
              disabled
              sx={{
                justifyContent: 'center',
                color: 'text.secondary',
                minHeight: 100,
              }}
            >
              <Typography variant="body2">No notifications</Typography>
            </MenuItem>
          ) : (
            <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
              {notifications.map((notification) => (
                <MenuItem
                  key={notification.id}
                  divider
                  sx={{
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  <ListItemIcon>
                    {notification.icon}
                  </ListItemIcon>
                  <Box>
                    <Typography variant="body2">{notification.text}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {notification.time}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Box>
          )}
        </Paper>
      </Menu>
    </Box>
  );
};

export default DashboardLayout;
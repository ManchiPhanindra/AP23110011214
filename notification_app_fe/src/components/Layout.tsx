import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button, useTheme, useMediaQuery } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f7fa' }}>
      <AppBar position="sticky" elevation={0} sx={{ borderBottom: '1px solid rgba(0,0,0,0.1)', bgcolor: '#ffffff', color: '#1a2027' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <NotificationsIcon sx={{ mr: 2, color: '#1976d2' }} />
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                flexGrow: 1,
                fontWeight: 700,
                textDecoration: 'none',
                color: 'inherit',
                letterSpacing: '-0.5px'
              }}
            >
              CampusNotify
            </Typography>
            <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 } }}>
              <Button 
                component={RouterLink} 
                to="/" 
                color={location.pathname === '/' ? 'primary' : 'inherit'}
                sx={{ fontWeight: location.pathname === '/' ? 700 : 400 }}
              >
                {isMobile ? 'Dash' : 'Dashboard'}
              </Button>
              <Button 
                component={RouterLink} 
                to="/priority" 
                color={location.pathname === '/priority' ? 'primary' : 'inherit'}
                sx={{ fontWeight: location.pathname === '/priority' ? 700 : 400 }}
              >
                {isMobile ? 'Priority' : 'Priority Inbox'}
              </Button>
              <Button 
                component={RouterLink} 
                to="/filter" 
                color={location.pathname === '/filter' ? 'primary' : 'inherit'}
                sx={{ fontWeight: location.pathname === '/filter' ? 700 : 400 }}
              >
                Filter
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {children}
      </Container>
      <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.05)', bgcolor: '#fff' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Campus Notifications System
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;

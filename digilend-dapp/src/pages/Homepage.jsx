import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Button, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loginpage from './Loginpage';
import Brightness6Icon from '@mui/icons-material/Brightness6';

const useStyles = makeStyles(theme => ({
  actionBtn: {
    padding: '12px 32px',
    borderRadius: '999px',
    fontWeight: 600,
    fontSize: '1rem',
    textTransform: 'none',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
    },
  },
  HomeBox: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: 16,
    },
  },
  themeToggleBtn: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    background: 'linear-gradient(90deg, #ff4ecd, #6f00ff)',
    borderRadius: '50%',
    padding: '12px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
}));

const Homepage = () => {
  const walletConnected = useSelector(state => state.connectWallet.walletConnected);
  const navigate = useNavigate();
  const classes = useStyles();
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#240b36' : '#ffffff';
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <div>
      {walletConnected ? (
        <Box
          sx={{
            background: darkMode
              ? 'linear-gradient(to bottom right, #240b36, #1c1c1c)'
              : 'linear-gradient(to bottom right, #f8f8f8, #ffffff)',
            width: '100%',
            minHeight: '100vh',
            color: darkMode ? '#ffffff' : '#111111',
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: '50px',
          }}
        >
          <Navbar />

          <Container
            maxWidth="lg"
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              px: 2,
              py: 8,
            }}
          >
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                background: darkMode
                  ? 'linear-gradient(90deg, #ff4ecd, #6f00ff)'
                  : 'none',
                WebkitBackgroundClip: darkMode ? 'text' : 'unset',
                WebkitTextFillColor: darkMode ? 'transparent' : 'inherit',
              }}
            >
              Blockchain Loan Lending dApp
            </Typography>

            <Typography
              variant="h6"
              gutterBottom
              sx={{
                maxWidth: 700,
                color: darkMode ? '#c7c7c7' : '#444444',
                mb: 4,
              }}
            >
              Borrow and lend securely with blockchain technology while earning up to{' '}
              <strong style={{ color: darkMode ? '#ffffff' : '#000000' }}>50% interest</strong>. Fast,
              decentralized, and transparent.
            </Typography>

            <Box
              className={classes.HomeBox}
              sx={{
                display: 'flex',
                gap: 3,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <Button
                variant="contained"
                className={classes.actionBtn}
                sx={{
                  backgroundColor: darkMode ? '#ffffff' : '#240b36',
                  color: darkMode ? '#240b36' : '#ffffff',
                  '&:hover': {
                    backgroundColor: darkMode ? '#f0f0f0' : '#3c1b54',
                  },
                }}
                onClick={() => navigate('/borrow')}
              >
                Borrow on Ethereum
              </Button>

              <Button
                variant="outlined"
                className={classes.actionBtn}
                sx={{
                  borderColor: darkMode ? '#ffffff' : '#240b36',
                  color: darkMode ? '#ffffff' : '#240b36',
                  '&:hover': {
                    backgroundColor: darkMode ? '#ffffff22' : '#240b3622',
                    borderColor: darkMode ? '#ff4ecd' : '#6f00ff',
                    color: darkMode ? '#ff4ecd' : '#6f00ff',
                  },
                }}
                onClick={() => navigate('/lend/crypto')}
              >
                Invest on Ethereum
              </Button>
            </Box>
          </Container>

          {/* Theme Toggle */}
          <IconButton className={classes.themeToggleBtn} onClick={toggleTheme}>
            <Brightness6Icon sx={{ color: darkMode ? '#fff' : '#000' }} />
          </IconButton>
        </Box>
      ) : (
        <Loginpage />
      )}
    </div>
  );
};

export default Homepage;
